import { UserApiSlice } from "./userApiSlice";
import cookies from "../../services/cookies";
import { userTokenKey } from "../../services/cookies/cookies_keys";

export const notificationSlice = UserApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllNotifications: builder.query({
            query: () => ({
                method: "GET",
                url: "notifications",
                headers: {
                    'authorization': cookies.get(userTokenKey)
                }
            })
        }),
        deleteAllNotifications: builder.mutation({
            query: () => ({
                method: "DELETE",
                url: `notifications`,
                headers: {
                    'authorization': cookies.get(userTokenKey)
                }
            })
        })
    })
})

export const { useDeleteAllNotificationsMutation, useGetAllNotificationsQuery } = notificationSlice;
// export const { getAllCategories, getCategory } = categorySlice.endpoints;