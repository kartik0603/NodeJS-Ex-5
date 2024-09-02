document
    .getElementById("courseForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        const courseData = {
            name: document.getElementById("name").value,
            category: document.getElementById("category").value,
            instructor: document.getElementById("instructor").value,
            duration: Number(document.getElementById("duration").value),
        };

        fetch("/courses/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(courseData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert("Course added successfully!");

                document.getElementById("courseForm").reset();
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Failed to add course.");
            });
    });
