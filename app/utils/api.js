const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchAllBooks() {
  try {
    const response = await fetch(`${baseUrl}/books`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchAllBestOFBooks() {
  try {
    const response = await fetch(`${baseUrl}/books?best=true`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchBook(id) {
  try {
    const response = await fetch(`${baseUrl}/books/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createBook(newBook) {
  try {
    const response = await fetch(`${baseUrl}/books/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    if (!response.ok) {
      throw new Error("Failed to POST books");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteBook(id) {
  try {
    const response = await fetch(`${baseUrl}/books/${id}`, {
      method: "DELETE",
    });
    console.log(`book id${id} deleted`);
    if (!response.ok) {
      throw new Error("Failed to Delete book");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function creatUser(user) {
  try {
    const response = await fetch(`${baseUrl}/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to Create user");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
