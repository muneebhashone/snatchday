import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'
import bg from '@/app/images/visittournament.png'
const VisitTournament = ({title, date}: {title: string, date: string}) => {
  return (
    <div className='relative'>
        <Image src={bg} alt='tournament' className='w-full h-full object-cover' />
        <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-10'>
            <h2 className='text-4xl font-bold text-white text-center'>{title}</h2>
            <p className='text-white text-sm mt-4'>Tournament starts on 
            <span className='text-primary text-sm'> {date}</span></p>
            <Button className='mt-4 text-black bg-white rounded-full'>
                <Link href='/tournament'>
                    Visit Tournament
                </Link>
            </Button>
        </div>
        
    </div>
  )
}

export default VisitTournament