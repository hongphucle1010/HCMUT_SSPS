type Role = "student" | "admin" | "guest"
async function fakeLogInApi(username: string, password: string)
{
    let success = false
    let role : Role = "guest"
    let name = ""
    
    if (username == "admin" && password == "admin") {
        success = true
        role = "admin"
        name = "Admin"
    }
    if (username == "student" && password == "student") {
        success = true
        role = "student"
        name = "TN01-03"
    }
    return { success, role, name }
}

export async function logIn(
    username: string,
    password: string
)
{
    const { success, role, name } = await fakeLogInApi(username, password)
    if (success) {
        localStorage.setItem("role", role)
        localStorage.setItem("name", name)
        return true
    }
    return false
}

export function logOut()
{
    localStorage.removeItem("role")
    localStorage.removeItem("name")
}