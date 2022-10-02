import { Alert, Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAllNotifications } from "../store/user/notifications"
import { useDeleteAllNotificationsMutation } from "../store/user/notificationSlice"

export default function Notifications() {
  let { notifications } = useSelector(state => state.notifications);
  let [deleteAllNotification, deleteAllNotificationResult] = useDeleteAllNotificationsMutation();

  let dispatch = useDispatch();

  useEffect(() => {
    deleteAllNotification();

    return () => {
      dispatch(removeAllNotifications())
    }
  }, []);

  return (
    notifications.length > 0 ?
      <Box>
        <Typography sx={{ textAlign: "center", fontSize: "fontSizes.meduim", color: "secondary.main", marginBottom: 3 }}>Notifications</Typography>
        {
          notifications.map((notification, index) => (
            <Box sx={{ border: 1, borderColor: "#eee", marginBottom: 2, width: "100%", padding: 3, backgroundColor: "primary.main" }} key={index}>
              <Typography variant="body1" color="white">{notification.text}</Typography>
            </Box>
          ))
        }
      </Box>
      : <Alert severity="error"> you haven't notifications</Alert>

  );
}

