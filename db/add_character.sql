INSERT INTO characters (name, image) 
VALUES ($1, $2)
RETURNING *;