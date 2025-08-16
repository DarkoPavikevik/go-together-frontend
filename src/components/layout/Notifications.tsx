import { BellOutlined, LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Badge, Button, Drawer, Spin } from "antd";
import { useState } from "react";
import { getAllBookings, getMyBookings } from "../../services/booking/bookingService";
import NotificationCards from "./parts/NotificationCards.tsx";
export interface INotification {
  id: number;
  userId: number;
  rideId: number;
  numberOfSeats: number;
  status: string;
  emailSent: boolean;
  username: string;
  phoneNumber: string | null;
  pickupLocation: string;
  dropoffLocation: string;
  note?: string;
}

export default function Notifications() {
  const [open, setOpen] = useState(false);

  // Zemi token od localStorage
 const token = localStorage.getItem("accessToken") || "";

const { data: bookings, isLoading, refetch } = useQuery({
  queryKey: ["get-my-bookings"],
  queryFn: () => getMyBookings(token),
});

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const pendingBookingsBadge =
    !isLoading &&
    bookings?.filter((booking: INotification) => booking.status === "PENDING")
      .length;

  return (
    <div>
      <Button
        size="large"
        variant="text"
        style={{
          border: "none",
          backgroundColor: "transparent",
          position: "relative",
        }}
        icon={<BellOutlined style={{ fontSize: "20px", margin: 6 }} />}
        onClick={showDrawer}
      >
        <span></span>
        <Badge
          count={pendingBookingsBadge}
          style={{ position: "absolute", bottom: 0, right: 8 }}
        />
      </Button>
      <Drawer
        title="Notifications"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        size="large"
      >
        {!isLoading ? (
          bookings?.map((data: INotification) => (
            <div className="p-2" key={data.id}>
              <NotificationCards
                notification={data}
                refetchNotifications={refetch}
              />
            </div>
          ))
        ) : (
          <div className="w-full flex items-center justify-center">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </div>
        )}
      </Drawer>
    </div>
  );
}
