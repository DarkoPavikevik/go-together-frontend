import { Button, Card, Spin, Typography } from "antd";
import { CardContent } from "../../ui/Card";
import type { INotification } from "../Notifications";
import {
  useMutation,
  type QueryObserverResult,
  type RefetchOptions,
} from "@tanstack/react-query";
import {
  updateBooking,
  type IUpdateBody,
} from "../../../services/booking/bookingService";
import { useTranslation } from "react-i18next";

interface INotificationCards {
  notification: INotification;
  refetchNotifications: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
}

const { Title } = Typography;

export default function NotificationCards({
  notification,
  refetchNotifications,
}: INotificationCards) {
  const { t } = useTranslation();

  const { mutate: updateBookingMutation, isPending } = useMutation({
    mutationKey: ["update-booking"],
    mutationFn: ({ id, body }: { id: number; body: IUpdateBody }) =>
      updateBooking(id, body),
    onSuccess: () => {
      refetchNotifications();
    },
  });

  const handleUpdateBooking = (id: number, body: IUpdateBody) => {
    updateBookingMutation({ id, body });
  };

  return (
    <Card>
      <CardContent className="!p-0">
        <div className="w-full flex items-center justify-between">
          <div className="w-1/3">
            <Title level={5}>{notification.username}</Title>
            <p>{notification.phoneNumber}</p>
          </div>
          <div className="w-2/3">
            <p>
              <strong>{t("rides.from")}:</strong> {notification.pickupLocation}
            </p>
            <p>
              <strong>{t("rides.to")}:</strong> {notification.dropoffLocation}
            </p>
            {notification.note && (
              <p>
                <strong>{t("rides.note")}:</strong> {notification.note}
              </p>
            )}
          </div>
          <div className="flex w-1/3 justify-end">
            {notification.status === "CONFIRMED" ? (
              <Button
                size="small"
                style={{
                  borderRadius: "999px",
                  color: "white",
                  backgroundColor: "green",
                  pointerEvents: "none",
                }}
              >
                Confirmed
              </Button>
            ) : notification.status === "REJECTED" ? (
              <Button
                size="small"
                style={{
                  borderRadius: "999px",
                  pointerEvents: "none",
                  color: "white",
                  backgroundColor: "red",
                }}
                type="text"
              >
                Rejected
              </Button>
            ) : (
              <div className="space-x-2">
                <Button
                  size="small"
                  style={{
                    borderRadius: "999px",
                    minWidth: "50px",
                  }}
                  type="default"
                  onClick={() =>
                    handleUpdateBooking(notification.id, {
                      userId: notification.userId,
                      rideId: notification.rideId,
                      status: "REJECTED",
                      emailSent: notification.emailSent,
                      username: notification.username,
                      phoneNumber: notification.phoneNumber,
                    })
                  }
                >
                  {isPending ? <Spin size="default" /> : "Reject"}
                </Button>
                <Button
                  size="small"
                  style={{
                    borderRadius: "999px",
                    minWidth: "50px",
                  }}
                  type="primary"
                  onClick={() =>
                    handleUpdateBooking(notification.id, {
                      userId: notification.userId,
                      rideId: notification.rideId,
                      status: "CONFIRMED",
                      emailSent: notification.emailSent,
                      username: notification.username,
                      phoneNumber: notification.phoneNumber,
                    })
                  }
                >
                  {isPending ? (
                    <Spin
                      size="default"
                      indicator={
                        <span className="custom-spin ant-spin-dot ant-spin-dot-spin">
                          <i className="ant-spin-dot-item" />
                          <i className="ant-spin-dot-item" />
                          <i className="ant-spin-dot-item" />
                          <i className="ant-spin-dot-item" />
                        </span>
                      }
                    />
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
