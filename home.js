fetch("/courses")
    .then((response) => response.json())
    .then((data) => {
        const courseList = document.getElementById("courseList");
        data.forEach((course) => {
            const courseItem = document.createElement("div");
            courseItem.innerHTML = `<h1>${course.name}</h1> - ${course.category} - ${course.instructor}`;
            courseItem.addEventListener("click", () => {
                alert(
                    `Name: ${course.name}\nCategory: ${course.category}\nInstructor: ${course.instructor}\nDuration: ${course.duration} hours`
                );
            });
            courseList.appendChild(courseItem);
        });
    });
