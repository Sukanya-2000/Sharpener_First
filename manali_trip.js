function createPost(post) {
  return new Promise((resolve) => {
    // Simulating post creation with a delay of 1 second
    setTimeout(() => {
      console.log(`Post Created: ${post}`);
      resolve(`Post Created: ${post}`);
    }, 1000);
  });
}

function updateLastUserActivityTime(user) {
  return new Promise((resolve) => {
    // Simulating user activity update with a delay of 1 second
    setTimeout(() => {
      const currentTime = new Date().toLocaleTimeString();
      console.log(`User Activity Updated at: ${currentTime}`);
      resolve(`User Activity Updated at: ${currentTime}`);
    }, 1000);
  });
}

function deleteLastPost(posts) {
  return new Promise((resolve) => {
    // Simulating post deletion with a delay of 1 second
    setTimeout(() => {
      const deletedPost = posts.pop();
      console.log(`Deleted Post: ${deletedPost}`);
      resolve(posts);
    }, 1000);
  });
}

function getColdDrinks() {
  return new Promise((resolve) => {
    // Simulating getting cold drinks with a delay of 1 second
    setTimeout(() => {
      console.log("Got Cold Drinks");
      resolve("Cold Drinks");
    }, 1000);
  });
}

async function main() {
  const user = {
    name: "Sukanya",
    lastActivityTime: null,
    posts: [],
  };

  try {
    const post1 = await createPost("Post 1");
    user.posts.push(post1);

    const activityTime = await updateLastUserActivityTime(user);
    user.lastActivityTime = activityTime;

    const post2 = await createPost("Post 2");
    user.posts.push(post2);

    const coldDrinks = await getColdDrinks();

    console.log("Final User State:");
    console.log(user);

    const updatedPosts = await deleteLastPost(user.posts);
    user.posts = updatedPosts;

    console.log("User State after Post Deletion:");
    console.log(user);
    
    console.log(`Enjoying ${coldDrinks}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
