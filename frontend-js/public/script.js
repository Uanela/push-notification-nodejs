console.log(Notification.permission);
const apiUrl = "http://localhost:8000";
// Issue your own, see /api/docs
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtcmVzNTduNDAwMDF2ZTRjY3NwMWl5cWwiLCJpYXQiOjE3ODM2Nzg2MTgsImV4cCI6MTc4NjI3MDYxOH0.L2DeUBGJzCodydWNlViRruqzSo3k0h_qBrJUbLnhSRk";

async function subscribeToPush() {
  const reg = await navigator.serviceWorker.register("/public/sw.js");

  const { key } = await fetch(
    `${apiUrl}/api/push-subscriptions/vapid-public-key`
  ).then((r) => r.json());

  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(key),
  });

  const stringifiedSub = JSON.parse(JSON.stringify(sub));
  const data = {
    ...stringifiedSub.keys,
    ...stringifiedSub,
    keys: undefined,
  };

  console.log(data, sub);
  await fetch(`${apiUrl}/api/push-subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
}

function urlBase64ToUint8Array(base64) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const base64Safe = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64Safe);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}
