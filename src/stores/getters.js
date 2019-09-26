import lstore from "@/plugins/lstore/";
export default {
    getUserById: ({ USERS }) => id => {
        return USERS[`user_${id}`] || {};
    },
    token:()=> lstore.getData('H5_ACCESS_TOKEN') || null
};