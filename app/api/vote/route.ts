import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { item } = await request.json()
  if (!item) {
    return new Response('Missing item', { status: 400 })
  }

  await supabase.from('votes').upsert(
    { user_id: userId, item },
    { onConflict: 'user_id,item' }
  )

  return new Response('OK', { status: 200 })
}
