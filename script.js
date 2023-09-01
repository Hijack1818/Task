// Call fetchReviews initially to load data when the page loads
fetchReviews();

// Function to edit a review
function editReview(id, title, content) {
  console.log(id, title, content);
  // Show the form
  toggleForm("update");
  //paste the review data into the form
  document.getElementById("titleUpdate").value = title;
  document.getElementById("contentUpdate").value = content;
  document.getElementById("idUpdate").value = id;
}

//fnction to update a review
function updateReview() {
  const title = document.getElementById("titleUpdate").value;
  const content = document.getElementById("contentUpdate").value;
  const _id = document.getElementById("idUpdate").value;
  fetch(`http://localhost:5000/api/${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Failed to update review");
      }
    })
    .then(() => {
      // After successfully updating the review, fetch fresh data
      fetchReviews();
      alert("Review has been updated.");
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to update review.");
    });
  toggleForm("update");
}

// Function to delete a review
function deleteReview(id) {
  fetch(`http://localhost:5000/api/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        console.log(res);
        return res.json();
      } else {
        throw new Error("Failed to delete review");
      }
    })
    .then(() => {
      // After successfully deleting the review, fetch fresh data
      fetchReviews();
      alert(`Review with ID ${id} has been deleted.`);
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to delete review.");
    });
}

// Function fetch review
function fetchReviews() {
  fetch("http://localhost:5000/api")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Failed to fetch reviews");
      }
    })
    .then((data) => {
      console.log(data);
      // Assuming you have a function to update the HTML table with the new data
      updateTable(data.body);
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to fetch reviews.");
    });
}

// Function to update the HTML table with the latest data
function updateTable(data) {
  data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const tableBody = document.getElementById("reviewTableBody");
  tableBody.innerHTML = "";
  // Populate the table with reviews
  data.forEach((review, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${review.title}</td>
            <td>${review.content}</td>
            <td>${review.createdAt}</td>
            <td><button onclick="editReview(${review._id},'${review.title}','${
      review.content
    }')">Edit</button></td>
            <td><button onclick="deleteReview(${
              review._id
            })">Delete</button></td>`;
    tableBody.appendChild(row);
  });
}

// Function to create a new review
function createReview() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const _id = document.getElementById("id").value;

  fetch("http://localhost:5000/api/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id, title, content }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Failed to create review");
      }
    })
    .then(() => {
      // After successfully creating the review, fetch fresh data
      fetchReviews();
      alert("Review has been created.");
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to create review.");
    });
  toggleForm("create");
}

// function to hide/show the form
function toggleForm(catogery) {
  //   console.log(catogery == "update");
  // Get a reference to the form element
  let reviewForm;
  if (catogery == "update") {
    console.log("update");
    reviewForm = document.getElementById("reviewFormUpdate");
  }
  if (catogery == "create") {
    reviewForm = document.getElementById("reviewForm");
  }

  reviewForm.hidden = !reviewForm.hidden;
}
