const urlBase64ToUint8Array = base64String => {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    };
    return outputArray;
};

const sendSubscription = subscription => {
    const [title, description] = ["New notification!", "<Body of the notification - Important information>"];

    fetch(`http://localhost:5000/notifications/subscribe`, {
        method: 'POST',
        body: JSON.stringify({
            subscription,
            title,
            description,
            icon: "https://previews.123rf.com/images/mainfu/mainfu1811/mainfu181100524/112712399-notification-icon-vector-bell-with-a-red-circle-linear-sign.jpg"
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const subscribeToServer = async registration => {
    try {
        const newSubscription = await registration.pushManager.subscribe({
            applicationServerKey: convertedVapidKey,
            userVisibleOnly: true,
        });
        return newSubscription;
    } catch ({ message }) { console.log(message); };
};

const getNotification = async () => {
    try {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            if (registration.pushManager) {
                const existedSubscription = await registration.pushManager.getSubscription();
                if (existedSubscription) sendSubscription(existedSubscription);
                else {
                    const newSubscription = subscribeToServer(registration);
                    sendSubscription(newSubscription);
                };
            } else console.log('Push manager unavailable.', registration);
        };
    } catch ({ message }) { console.log(message); };
};

const convertedVapidKey = urlBase64ToUint8Array("BOrKZEbTZt_XmWb2KG5g6h872w_xmaufGqh4aEyjPfZH5fSZFzWskWdQylfWA_vbKiRDgb0hwO33M_vpmp0SkKk");

export default getNotification;