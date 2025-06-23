import { BellOutlined, LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Drawer, Spin } from "antd";
import { useState } from "react";
import { getAllBookings } from "../../services/booking/bookingService";
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
}

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const {
    data: bookings,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-bookings"],
    queryFn: () => getAllBookings(),
    enabled: !!open,
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="large"
        variant="text"
        style={{ border: "none" }}
        icon={<BellOutlined style={{ fontSize: "20px", margin: 6 }} />}
        onClick={showDrawer}
      ></Button>
      <Drawer
        title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        size="large"
      >
        {!isLoading ? (
          bookings?.map((data: INotification) => {
            return (
              <div className="p-2">
                <NotificationCards
                  key={data.id}
                  notification={data}
                  refetchNotifications={refetch}
                />
              </div>
            );
          })
        ) : (
          <div className="w-full flex items-center justify-center">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          </div>
        )}
      </Drawer>
    </div>
  );
}
