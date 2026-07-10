console.log("running", self);
self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log(data);
  event.waitUntil(
    self.registration
      .showNotification(data.title, {
        body: data.body,
        data: data.data,
        icon: "/public/images/icon.png",
      })
      .then(console.info)
      .catch(console.error)
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log(event);
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || "/"));
});
