import { Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from "react-redux";
import { useGetAllNotificationsQuery } from "../../../../store/user/notificationSlice";
import { addNewNotification, addNotifications } from "../../../../store/user/notifications";
export default function Notification() {
    let { notifications } = useSelector(state => state.notifications);
    let { data, isSuccess } = useGetAllNotificationsQuery();

    let dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess)
            dispatch(addNotifications({ notifications: data.notifications }));
    }, [isSuccess])


    return <Badge badgeContent={notifications.length} color="error">
        <NotificationsIcon />
    </Badge>
}
