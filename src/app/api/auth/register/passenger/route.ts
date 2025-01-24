import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req:Request){
    try{
        const {name,email,password} = await req.json();
        
        const existingUser = await prisma.passenger.findUnique({
            where:{email:email}
        })
        if(existingUser)return NextResponse.json({message:"user already exist"});

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await prisma.passenger.create({
            data:{
                name,
                email,
                password:hashedPassword
            }
        })
        const userId = newUser.id;
        const token = jwt.sign({userId},"mysecretkey",{expiresIn:'1h'})
        const {password:_,...userInfo} = newUser;
        return NextResponse.json({user:userInfo,token})

    }catch(e){
        return NextResponse.json({message:"internal server error"})
    }
}