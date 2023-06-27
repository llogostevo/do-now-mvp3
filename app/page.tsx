import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from './logout-button'
import Subject from './subject/page'


export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
    <div className="flex-1 flex flex-col max-w-3xl mt-24 justify-center items-center mx-auto">
      <h1 className="text-4xl mb-2 flex justify-between">
        <span className="sr-only">Do Now Generator</span>
      </h1>

      <div className="flex py-3 text-neutral-100">
        <span className="ml-auto">
          {user ? (
          <>
            <span className="flex gap-4 text-sm">
              <Link href="/" className="text-white">&#x1f916;</Link>
              Hey, {user.email}! <span className="border-r"></span>{' '}
              <LogoutButton />
            </span>
            <Subject />
            </>
          ) : (
            <>
            <div className="text-center">
              <h1 className="text-4xl mb-4">Do Now Generator</h1>
              <Link href="/login" className="text-neutral-100 text-sm hover:underline">
                Login / Register
              </Link>
            </div>
            </>
          )}
        </span>
      </div>
      <div className="mt-8 justify-center items-center mx-auto">
        <ul className="list-disc list-inside space-y-6 text-2xl ml-4 mt-4">
          <li className="font-semibold">Say goodbye to pre-class brainstorming! Our product effortlessly takes that load off your plate.</li>
          <li className="font-semibold">Simply input your topic, and voila! Our genius generator promptly delivers three bespoke questions tailored to your subject and proficiency level.</li>
          <li className="font-semibold">Ready for the big reveal? At your command, our system unveils meticulously crafted model answers, ensuring your students grasp the topic thoroughly.</li>
        </ul>
      </div>
    </div>  
</>  

  )
}
