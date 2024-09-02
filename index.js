const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

let courses = [
    {
        id: 1,
        name: "Initial Course",
        category: "Programming",
        instructor: "Jane Doe",
        duration: 15,
    },
];

let NextCourseID = 2;

app.get("/", (req, res) => {
    res.send("Welcome to the Online Course Management API.");
});

//  all courses
app.get("/courses", (req, res) => {
    res.status(200).json(courses);
});

// addCourse.html
app.get("/add", (req, res) => {
    res.sendFile(__dirname + "/addCourse.html");
});

// index.html
app.get("/index", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// New courses ADD

app.post("/courses/add", (req, res) => {
    const { name, category, instructor, duration } = req.body;
    if (!instructor || !duration || !category || !name) {
        return res.status(400).send("All fields are required");
    }

    const newCourse = {
        id: NextCourseID++,
        name,
        category,
        instructor,
        duration: Number(duration),
    };
    courses.push(newCourse);
    res.json(courses);
});

// update Course
app.patch("/courses/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, category, instructor, duration } = req.body;

    const course = courses.find((c) => c.id == id);

    if (!course) {
        return res.status(404).send("Course not found");
    }

    name && (course.name = name);
    category && (course.category = category);
    instructor && (course.instructor = instructor);
    duration && (course.duration = Number(duration));

    res.json(courses);
});

// DELETE
app.delete("/courses/delete/:id", (req, res) => {
    const { id } = req.params;

    courses = courses.filter((c) => c.id != id);

    res.json(courses);
});

// filter
app.get("/courses/filter", (req, res) => {
    const { category, instructor, duration } = req.query;

    const filteredCourses = courses.filter(
        (c) =>
            (!category || c.category.toLowerCase() === category.toLowerCase()) &&
            (!instructor ||
                c.instructor.toLowerCase() === instructor.toLowerCase()) &&
            (!duration || c.duration == Number(duration))
    );

    res.json(filteredCourses);
});

//   specific course
app.get("/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = courses.find((c) => c.id == id);

    if (!course) {
        return res.status(404).send("Course not found");
    }

    res.json(course);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
