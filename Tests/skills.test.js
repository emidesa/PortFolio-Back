const request = require("supertest")
const express = require("express")
const skillsRoute = require("../Routes/skillsRoute")

const app = express()
app.use(express.json())
app.use("/skills", skillsRoute)

// Mock de la base de données
jest.mock("../bdd", () => ({
  query: jest.fn((query, params, callback) => {
    if (typeof params === "function") {
      callback = params
      params = []
    }

    if (query.includes("SELECT * FROM Skills")) {
      callback(null, [
        {
          idSkills: 1,
          Name: "HTML5",
          IconeTechno: "http://192.168.1.16:3000/assets/html.png",
          category: "front-end",
        },
        {
          idSkills: 2,
          Name: "CSS",
          IconeTechno: "http://192.168.1.16:3000/assets/css.png",
          category: "front-end",
        },
      ])
    } else if (query.includes("INSERT INTO Skills")) {
      callback(null, { affectedRows: 1, insertId: 3 })
    } else if (query.includes("UPDATE Skills")) {
      callback(null, { affectedRows: 1 })
    } else if (query.includes("DELETE FROM Skills")) {
      callback(null, { affectedRows: 1 })
    } else {
      callback(new Error("Query not supported"))
    }
  }),
}))

describe("Skills Route Tests", () => {
  // Test: GET /skills/allSkills
  test("GET /skills/allSkills should return all skills", async () => {
    const response = await request(app).get("/skills/allSkills")

    console.log("🛠 Réponse du serveur :", response.body)

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBeGreaterThan(0)
  })

  // Test: POST /skills/addSkills
  test("POST /skills/addSkills should add a new skill", async () => {
    const newSkill = {
      Name: "Test Skill",
      IconeTechno: "test-icon.png",
      category: "Test Category",
    }
    const response = await request(app).post("/skills/addSkills").send(newSkill)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe("Compétences ajoutées avec succès")
  })

  // Test: PUT /skills/updateSkills/:idSkills
  test("PUT /skills/updateSkills/:idSkills should update a skill", async () => {
    const updatedSkill = {
      Name: "Updated Name",
      IconeTechno: "updated-icon.png",
      category: "Updated Category",
    }
    const response = await request(app).put("/skills/updateSkills/1").send(updatedSkill)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe("Compétences modifiées avec succès")
  })

  // Test: DELETE /skills/deleteSkills/:idSkills
  test("DELETE /skills/deleteSkills/:idSkills should delete a skill", async () => {
    const response = await request(app).delete("/skills/deleteSkills/1")
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe("Compétences supprimées avec succès")
  })
})

