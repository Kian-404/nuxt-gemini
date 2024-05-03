// disableLogs

function disableLogs() {
  console.log = () => {};
}
export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  process.env.NODE_ENV === "production" ? disableLogs() : null;
});


