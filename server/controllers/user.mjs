import sql from "../utils/db.mjs";

export const viewUserProfile = async (req, res) => {
  const userIdFromClient = req.params.userId;

  let result;

  try {
    result = await sql`
      SELECT
	        users.phone_number,
          users.email,
          user_profiles.firstname,
          user_profiles.lastname,
          user_profiles.id_number,
          user_profiles.date_of_birth,
          user_profiles.image
      FROM users
      INNER JOIN user_profiles on users.id = user_profiles.user_id
      WHERE user_id = ${userIdFromClient}`;
  } catch (error) {
    return res.status(500).json({
      message: `Server could not bacause database connection: ${error.message}`,
    });
  }

  return res.status(200).json({
    data: result[0],
  });
};

export const createUserProfile = async (req, res) => {
  const newUserProfile = {
    ...req.body,
    created_at: new Date(),
    updated_at: new Date(),
  };

  try {
    const existingUser = await sql`
      SELECT id FROM user_profiles WHERE user_id = ${newUserProfile.user_id}
    `;

    let result;
    if (existingUser.length > 0) {
      result = await sql`
        UPDATE user_profiles
        SET firstname = ${newUserProfile.first_name},
            lastname = ${newUserProfile.last_name},
            id_number = ${newUserProfile.id_number},
            email = ${newUserProfile.email},
            date_of_birth = ${newUserProfile.date_of_birth},
            updated_at = ${newUserProfile.updated_at},
            image = ${newUserProfile.image}
        WHERE user_id = ${newUserProfile.user_id}
        RETURNING *
      `;
    } else {
      result = await sql`
        INSERT INTO user_profiles (user_id, firstname, lastname, id_number, email, date_of_birth, created_at, updated_at, image)
        VALUES (${newUserProfile.user_id}, ${newUserProfile.first_name}, ${newUserProfile.last_name},
                ${newUserProfile.id_number}, ${newUserProfile.email}, ${newUserProfile.date_of_birth},
                ${newUserProfile.created_at}, ${newUserProfile.updated_at}, ${newUserProfile.image})
        RETURNING *
      `;
    }

    await sql`
      UPDATE users
      SET email = ${newUserProfile.email}, phone_number = ${newUserProfile.phone_number}, updated_at = ${newUserProfile.updated_at}
      WHERE id = ${newUserProfile.user_id}
    `;

    return res.status(201).json({
      message: `User profile successfully created or edited`,
      data: result,
    });
  } catch {
    return res.status(500).json({
      message: `Server could not bacause database connection`,
    });
  }
};

export const viewPetProfile = async (req, res) => {
  const userIdFromClient = req.params.userId;

  let result;

  try {
    result = await sql`
    SELECT
      DISTINCT ON (pets.id)
      pets.id,
      pets.user_id,
      pets.pet_name,
      pets.pet_type,
      pets.breed,
      pets.sex,
      pets.age,
      pets.color,
      pets.weight,
      pets.about,
      pets.image,
      bookings.status
    FROM 
      pets
    LEFT JOIN 
      booking_pets ON pets.id = booking_pets.pet_id
    LEFT JOIN
      bookings ON booking_pets.booking_id = bookings.id
    WHERE 
      pets.user_id = ${userIdFromClient}
    ORDER BY 
      pets.id, booking_pets.booking_id DESC;
`;
  } catch {
    return res.status(500).json({
      message: `Server could not bacause database connection`,
    });
  }

  return res.status(200).json({
    data: result,
  });
};

export const createPetProfile = async (req, res) => {
  const newPet = {
    ...req.body,
    created_at: new Date(),
    updated_at: new Date(),
  };

  console.log(newPet);
  let result;

  try {
    result = await sql`
      INSERT INTO pets (user_id, pet_name, pet_type, breed, sex, age, color, weight, about, image, created_at, updated_at)
      VALUES (${newPet.user_id}, ${newPet.pet_name}, ${newPet.pet_type}, ${newPet.breed},
              ${newPet.sex}, ${newPet.age}, ${newPet.color}, ${newPet.weight},
              ${newPet.about}, ${newPet.image}, ${newPet.created_at}, ${newPet.updated_at})
      RETURNING *`;
  } catch {
    return res.status(500).json({
      message: `Server could not bacause database connection`,
    });
  }

  return res.status(201).json({
    message: `Pet create successfully`,
    data: result,
  });
};

export const updatePetProfile = async (req, res) => {
  const petId = req.params.petId;
  const updatePet = { ...req.body, updated_at: new Date() };

  let result;

  try {
    result = await sql`
    UPDATE pets
    SET pet_name = ${updatePet.pet_name},
        pet_type = ${updatePet.pet_type},
        breed = ${updatePet.breed},
        sex = ${updatePet.sex},
        age = ${updatePet.age},
        color = ${updatePet.color},
        weight = ${updatePet.weight},
        about = ${updatePet.about},
        image = ${updatePet.image},
        updated_at = ${updatePet.updated_at}
    WHERE id = ${petId}
    RETURNING *`;
  } catch {
    return res.status(500).json({
      message: `Server could not bacause database connection`,
    });
  }

  return res.status(200).json({
    message: `Pet update successfully`,
    data: result,
  });
};

export const deletePetProfile = async (req, res) => {
  const petId = req.params.petId;

  try {
    const result = await sql`
      DELETE FROM pets
      WHERE id = ${petId}
      RETURNING *;
    `;

    console.log(result);

    return res.status(201).json({
      message: `Pet profile successfully deleted`,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: `Server could not bacause database connection`,
    });
  }
};

export const getProfilePicAndName = async (req, res) => {
  const UserId = req.user.id;
  try {
    const result = await sql`
      SELECT image, firstname, lastname
      FROM user_profiles
      WHERE user_id = ${UserId}`;

    if (result.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json({ message: "Data retrieved successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
