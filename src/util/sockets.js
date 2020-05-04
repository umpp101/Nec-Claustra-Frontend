export function getAlertMsg(type, alert_receviers) {
    const msg = {
        command: "message",
        identifier: JSON.stringify({
            channel: "ChatChannel",
        }),
        data: JSON.stringify({
            action: "alert",
            message: {
                alert_receviers,
                type
            }
        })
    };
    return JSON.stringify(msg);
}
export function getNewMsgBody(content, user_id, convo) {
    const msg = {
        command: "message",
        identifier: JSON.stringify({
            channel: "ChatChannel",
        }),
        data: JSON.stringify({
            action: "speak",
            message: {
                content,
                user_id,
                conversation_id: convo.id,
                alert_receviers: [convo.receiver_id, convo.sender_id]
            },
        })
    };
    return JSON.stringify(msg);
}
export function getConvoConnecterReq(user) {
    const msg = {
        command: "message",
        identifier: JSON.stringify({
            channel: "ChatChannel",
        }),
        data: JSON.stringify({
            action: "convo_connector",
            message: JSON.stringify({
                user_id: user.id
            })
        })
    };
    return JSON.stringify(msg);
}