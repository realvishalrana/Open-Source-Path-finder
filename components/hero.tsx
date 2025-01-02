'use client';

export function Hero() {
  return (
    <div className='relative bg-background py-24 sm:py-32'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-2xl text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-primary sm:text-6xl'>
            Find Your Perfect Open Source Project
          </h1>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            Connect with open-source projects that match your skills, interests, and availability.
            Start contributing to meaningful projects today.
          </p>
        </div>
      </div>
    </div>
  );
}
