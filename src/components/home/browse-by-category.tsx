import { categories } from "@/lib/data"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export function BrowseByCategory() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Browse by Category</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                        Find opportunities tailored to your field of interest.
                    </p>
                </div>
            </div>
            <div className="mx-auto grid grid-cols-2 gap-4 py-12 sm:grid-cols-3 md:gap-6 lg:grid-cols-6">
                {categories.map((category) => (
                    <Link key={category.slug} href={`/opportunities?category=${category.slug}`} className="group">
                        <Card className="h-full transform transition-all duration-300 hover:shadow-lg hover:border-primary">
                            <CardContent className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                                <div className="rounded-full bg-primary/10 p-4 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <category.icon className="h-8 w-8" />
                                </div>
                                <h3 className="font-semibold text-base">{category.name}</h3>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  )
}
