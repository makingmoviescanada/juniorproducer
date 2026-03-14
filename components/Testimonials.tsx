"use client"

const testimonials = [
  {
    name: "Maya Rodriguez",
    role: "Director & Producer",
    quote: "Junior saved me hours every week managing budget notes and scheduling. It's like having an assistant who never sleeps.",
    company: "Rodriguez Films",
  },
  {
    name: "James Chen",
    role: "Line Producer",
    quote: "Finally, a tool that understands Canadian tax credits and funding. No more Googling eligibility requirements.",
    company: "Chen Productions",
  },
  {
    name: "Aisha Okonkwo",
    role: "Production Manager",
    quote: "The team stays organized, collaborators understand what we're doing, and I actually get to produce instead of just firefight.",
    company: "Okonkwo Media",
  },
]

export function Testimonials() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="border-2 border-junior-black bg-junior-white p-6 shadow-hard-parchment-sm"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-junior-red text-sm">★</span>
              ))}
            </div>
            <p className="text-junior-black/80 leading-relaxed mb-6 font-sans text-sm">
              "{testimonial.quote}"
            </p>
            <div className="pt-4 border-t border-junior-black/10">
              <p className="font-display text-junior-black text-sm uppercase tracking-wider">
                {testimonial.name}
              </p>
              <p className="text-junior-black/60 text-xs font-sans">
                {testimonial.role}
              </p>
              <p className="text-junior-black/50 text-xs font-sans mt-1">
                {testimonial.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
