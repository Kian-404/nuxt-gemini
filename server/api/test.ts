export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const repo = await $fetch("https://gemini-node.vercel.app", {
    // headers: {
    //   Authorization: `token ${config.githubToken}`,
    // },
  });

  return repo;
});
