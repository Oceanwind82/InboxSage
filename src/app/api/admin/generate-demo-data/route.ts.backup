import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { subDays } from 'date-fns'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {
  try {
    // Generate demo users
    const demoUsers = []
    const userEmails = [
      'alice@example.com',
      'bob@company.com',
      'charlie@startup.io',
      'diana@agency.com',
      'evan@tech.org',
      'fiona@business.net',
      'george@services.co',
      'helen@consulting.com'
    ]

    for (let i = 0; i < userEmails.length; i++) {
      const createdAt = subDays(new Date(), Math.floor(Math.random() * 90)).toISOString()
      const lastSignIn = subDays(new Date(), Math.floor(Math.random() * 30)).toISOString()
      
      demoUsers.push({
        email: userEmails[i],
        created_at: createdAt,
        last_sign_in_at: lastSignIn,
        subscription_status: ['active', 'trial', 'free'][Math.floor(Math.random() * 3)]
      })
    }

    // Insert demo users (or update if exists)
    const { error: usersError } = await supabase
      .from('users')
      .upsert(demoUsers, { onConflict: 'email' })

    if (usersError) {
      console.error('Error inserting demo users:', usersError)
    }

    // Generate demo templates
    const demoTemplates = [
      {
        name: 'Professional Follow-up',
        usage_count: Math.floor(Math.random() * 100) + 20,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name: 'Meeting Request',
        usage_count: Math.floor(Math.random() * 80) + 15,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name: 'Thank You Note',
        usage_count: Math.floor(Math.random() * 60) + 10,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name: 'Project Update',
        usage_count: Math.floor(Math.random() * 90) + 25,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name: 'Client Proposal',
        usage_count: Math.floor(Math.random() * 70) + 12,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]

    const { error: templatesError } = await supabase
      .from('templates')
      .upsert(demoTemplates, { onConflict: 'name' })

    if (templatesError) {
      console.error('Error inserting demo templates:', templatesError)
    }

    // Generate demo replies
    const { data: users } = await supabase
      .from('users')
      .select('id')
      .limit(5)

    if (users && users.length > 0) {
      const demoReplies = []
      for (let i = 0; i < 50; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)]
        const createdAt = subDays(new Date(), Math.floor(Math.random() * 30)).toISOString()
        
        demoReplies.push({
          user_id: randomUser.id,
          original_email: `Sample email content ${i + 1}`,
          generated_reply: `AI-generated reply ${i + 1}`,
          created_at: createdAt
        })
      }

      const { error: repliesError } = await supabase
        .from('replies')
        .insert(demoReplies)

      if (repliesError) {
        console.error('Error inserting demo replies:', repliesError)
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Demo data generated successfully',
      generated: {
        users: demoUsers.length,
        templates: demoTemplates.length,
        replies: 50
      }
    })

  } catch (error) {
    console.error('Demo data generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate demo data' }, 
      { status: 500 }
    )
  }
}
