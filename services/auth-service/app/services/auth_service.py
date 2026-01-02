from app.core.security import create_access_token, verify_password, get_password_hash

# Simulación simple (luego irá DB)
fake_users_db = {}

def register_user(data):
    hashed_password = get_password_hash(data.password)
    fake_users_db[data.username] = {
        "username": data.username,
        "password": hashed_password,
        "role": data.role
    }
    return {"message": "User registered successfully"}

def authenticate_user(data):
    user = fake_users_db.get(data.username)
    if not user:
        return None
    if not verify_password(data.password, user["password"]):
        return None
    return create_access_token({"sub": user["username"], "role": user["role"]})
