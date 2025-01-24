import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req:Request){
    try{
        const {email,password} = await req.json();
        
        const existingUser = await prisma.passenger.findUnique({
            where:{email:email}
        })
        if(!existingUser)return NextResponse.json({ error: 'No user found' }, { status: 401 })

        const valid = await bcrypt.compare(password,existingUser.password);
        if(!valid){ return NextResponse.json({message:"incorrect password"},{status:400});}

        const userId = existingUser?.id;
        const token = jwt.sign({userId},"mysecretkey",{expiresIn:'1h'})
        const {password:_,...userInfo} = existingUser;
        return NextResponse.json({user:userInfo,token});

    }catch(e){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}