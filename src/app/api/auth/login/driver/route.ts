import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req:Request){
    try{
        const {email,password} = await req.json();
        
        const existingDriver = await prisma.driver.findUnique({
            where:{email:email}
        })
        if(!existingDriver)return NextResponse.json({ error: 'No driver found' }, { status: 401 })

        const valid = await bcrypt.compare(password,existingDriver.password);
        if(!valid){ return NextResponse.json({error:"incorrect password"},{status:401});}
        const driverId = existingDriver?.id;
        const token = jwt.sign({driverId},"mysecretkey",{expiresIn:'1h'})
        const {password:_,...driverInfo} = existingDriver;
        return NextResponse.json({driver:driverInfo,token});

    }catch(e){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
