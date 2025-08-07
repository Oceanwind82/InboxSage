import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { format, subDays, startOfDay } from 'date-fns'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    // Fetch users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (usersError) {
      console.error('Error fetching users:', usersError)
    }

    // Fetch replies
    const { data: replies, error: repliesError } = await supabase
      .from('replies')
      .select('*')
      .order('created_at', { ascending: false })

    if (repliesError) {
      console.error('Error fetching replies:', repliesError)
    }

    // Fetch templates
    const { data: templates, error: templatesError } = await supabase
      .from('templates')
      .select('*')
      .order('usage_count', { ascending: false })

    if (templatesError) {
      console.error('Error fetching templates:', templatesError)
    }

    // Calculate stats
    const totalUsers = users?.length || 0
    const activeUsers = users?.filter(user => {
      const lastSignIn = user.last_sign_in_at
      if (!lastSignIn) return false
      const thirtyDaysAgo = subDays(new Date(), 30)
      return new Date(lastSignIn) > thirtyDaysAgo
    }).length || 0

    const totalReplies = replies?.length || 0
    const avgRepliesPerUser = totalUsers > 0 ? totalReplies / totalUsers : 0

    // Mock some financial data (replace with Stripe integration)
    const mrr = totalUsers * 29 // $29/month per user
    const totalRevenue = mrr * 12 // Annual estimate
    const conversionRate = 25.5 // Mock conversion rate
    const churnRate = 5.2 // Mock churn rate

    // Generate chart data for the last 30 days
    const chartData = []
    for (let i = 29; i >= 0; i--) {
      const date = format(subDays(new Date(), i), 'MMM dd')
      const dayUsers = Math.floor(Math.random() * 10) + totalUsers / 30
      const dayRevenue = Math.floor(Math.random() * 1000) + mrr / 30
      const dayReplies = Math.floor(Math.random() * 50) + totalReplies / 30
      
      chartData.push({
        date,
        users: Math.floor(dayUsers),
        revenue: Math.floor(dayRevenue),
        replies: Math.floor(dayReplies)
      })
    }

    // Format users data
    const formattedUsers = (users || []).map(user => ({
      id: user.id,
      email: user.email || 'unknown@example.com',
      created_at: user.created_at || new Date().toISOString(),
      last_sign_in_at: user.last_sign_in_at,
      subscription_status: user.subscription_status || 'free'
    }))

    // Format templates data
    const formattedTemplates = (templates || []).map(template => ({
      id: template.id,
      name: template.name || 'Untitled Template',
      usage_count: template.usage_count || 0,
      last_used: template.updated_at || template.created_at || new Date().toISOString()
    }))

    const stats = {
      totalUsers,
      activeUsers,
      totalRevenue,
      mrr,
      totalReplies,
      avgRepliesPerUser,
      conversionRate,
      churnRate
    }

    return NextResponse.json({
      stats,
      chartData,
      users: formattedUsers.slice(0, 10), // Return top 10 users
      templates: formattedTemplates.slice(0, 10) // Return top 10 templates
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' }, 
      { status: 500 }
    )
  }
}
