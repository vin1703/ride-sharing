import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req:Request){
    try{
        const {email,name,password} = await req.json();
        
        const existingDriver = await prisma.driver.findUnique({
            where:{email:email}
        })
        if(existingDriver)return NextResponse.json({message:"user already exist"});

        const hashedPassword = await bcrypt.hash(password,10);

        const newDriver = await prisma.driver.create({
            data:{
                name,
                email,
                password:hashedPassword
            }
        })
        const driverId = newDriver.id;
        const token = jwt.sign({driverId},"mysecretkey",{expiresIn:'1h'})
        const {password:_,...driverInfo} = newDriver;
        return NextResponse.json({driver:driverInfo,token})

    }catch(e){
        return NextResponse.json({message:"internal server error"})
    }
}