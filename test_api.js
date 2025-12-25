const BASE_URL = "http://localhost:3000/api";

async function test() {
  console.log("--- Starting API Test ---");

  // 1. Create Blog
  console.log("\n1. Testing CREATE...");
  const createRes = await fetch(`${BASE_URL}/blog/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Test Blog",
      description: "This is a test blog content",
      author: "Tester",
    }),
  });
  const createData = await createRes.json();
  console.log("Create Response:", createData);
  const newId = createData.blog ? createData.blog.id : null;

  if (!newId) {
    console.error("Failed to create blog, cannot proceed.");
    return;
  }

  // 2. Get Blog
  console.log(`\n2. Testing GET (ID: ${newId})...`);
  const getRes = await fetch(`${BASE_URL}/blog/${newId}`);
  const getData = await getRes.json();
  console.log("Get Response:", getData);

  // 3. Update Blog
  console.log(`\n3. Testing UPDATE (ID: ${newId})...`);
  const updateRes = await fetch(`${BASE_URL}/blog/${newId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Updated Test Blog",
    }),
  });
  const updateData = await updateRes.json();
  console.log("Update Response:", updateData);

  // 4. Delete Blog
  console.log(`\n4. Testing DELETE (ID: ${newId})...`);
  const deleteRes = await fetch(`${BASE_URL}/blog/${newId}`, {
    method: "DELETE",
  });
  const deleteData = await deleteRes.json();
  console.log("Delete Response:", deleteData);

  // 5. Verify Delete
  console.log(`\n5. Verifying Deletion (ID: ${newId})...`);
  const verifyRes = await fetch(`${BASE_URL}/blog/${newId}`);
  if (verifyRes.status === 404) {
    console.log("Success: Blog not found as expected.");
  } else {
    console.log("Fail: Blog still exists or other error.", verifyRes.status);
  }
}

// Wait a bit for server to restart if needed, though we run this manually
setTimeout(test, 2000);
