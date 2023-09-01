// Call fetchReviews initially to load data when the page loads
fetchReviews();
let formVisible = false;

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
            <td><a href="/${review._id}">Edit</a></td>
            <td><button onclick="deleteReview(${
              review._id
            })">Delete</button></td>
        `;
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
}

function toggleForm() {
  // Get a reference to the form element
  const reviewForm = document.getElementById("reviewForm");

  // Toggle the visibility of the form
  if (formVisible) {
    reviewForm.hidden = true; // Hide the form
  } else {
    reviewForm.hidden = false; // Show the form
  }

  // Update the formVisible variable
  formVisible = !formVisible;
}
