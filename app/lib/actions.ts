"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "./prisma";
import jwt from 'jsonwebtoken';

export async function submitScore(formData: FormData) {


 const name = formData.get("name")?.toString();
 const tokenFromForm = formData.get("token")?.toString();

 
    console.log(tokenFromForm)
    if (!name || !tokenFromForm) {
      throw new Error("Name and token are required.");
    }

    try {
        const decoded = jwt.verify(tokenFromForm, process.env.JWT_SECRET!) as {
          imageId: string;
          startTime: number;
          sessionId: string;
          iat: number;
          exp: number;
        };
  
        const { imageId, startTime} = decoded;
  
        const endTime = Date.now();
        const elapsedTime = endTime - startTime; 
  
        if (elapsedTime < 0 || elapsedTime > 15 * 60 * 1000) {
          throw new Error('Invalid elapsed time.');
        }
  
    
  
        await prisma.leaderboard.create({
          data: {
            name,
            imageId,
            duration: elapsedTime,
          },
        });
  
     
      
      } catch (error) {
        console.error('Error submitting score:', error);
        throw error;
      }
      revalidatePath("/leaderboard");
      redirect(`/leaderboard`);

   
    }





  
   
  

export async function checkCoordinates({
  x,
  y,
  imageId,
}: {
  x: number;
  y: number;
  imageId: string;
}) {
  try {
    const characters = await prisma.character.findMany({
      where: { imageId },
    });

    const foundCharacters = characters.filter((character) => {
      const distance = Math.sqrt(
        Math.pow(x - character.x, 2) + Math.pow(y - character.y, 2)
      );
      console.log(
        `Character ${character.name}: distance = ${distance}, radius = ${character.radius}`
      );
      return distance <= character.radius;
    });

    if (foundCharacters.length > 0) {
      return {
        message: `Found ${foundCharacters.map((c) => c.name).join(", ")}!`,
        foundCharacters: foundCharacters.map((c) => c.name),
        isFound: true,
      };
    } else {
      return { message: "Try Again", isFound: false };
    }
  } catch (err) {
    console.error(`Error checking coordinates:`, err);
    throw new Error("Internal Server Error");
  }
}
