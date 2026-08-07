"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Aurora from "@/components/Aurora";
import BlurText from "@/components/BlurText";

export default function HeroSection() {
    return (
        <main className='overflow-hidden'>
            <section className='relative min-h-[92svh] bg-background'>
                <div className='pointer-events-none absolute inset-0 opacity-70'>
                    <Aurora colorStops={["#0a0a0b", "#134e4a", "#0a0a0b"]} amplitude={0.7} blend={0.45} speed={0.45} />
                </div>
                <div className='relative z-10 mx-auto flex min-h-[92svh] w-full max-w-5xl flex-col justify-center px-6 py-28'>
                    <BlurText
                        text='Semantic API contract change detection'
                        className='max-w-3xl text-4xl font-semibold tracking-tight text-balance text-foreground md:text-6xl'
                        animateBy='words'
                        direction='top'
                        delay={80}
                    />
                    <p className='mt-8 max-w-2xl text-lg text-balance text-muted-foreground'>
                        Paste two API responses or OpenAPI specs. Get a classified semantic diff (Breaking,
                        Non-Breaking, Deprecation) plus migration snippets and a one-click Migration Guide.
                    </p>
                    <div className='mt-10 flex flex-wrap items-center gap-3'>
                        <Button asChild size='lg' className='pr-4.5'>
                            <Link href='/app'>
                                <span className='text-nowrap'>Open workspace</span>
                                <ChevronRight className='opacity-50' />
                            </Link>
                        </Button>
                        <Button asChild size='lg' variant='outline'>
                            <Link href='#how-it-works'>
                                <span className='text-nowrap'>How it works</span>
                            </Link>
                        </Button>
                    </div>
                    <pre className='mt-14 max-w-xl overflow-hidden rounded-lg border border-border bg-panel/90 p-4 font-mono text-xs leading-relaxed text-muted-foreground backdrop-blur'>
                        {`+ removed  response.body.user.email
~ type     response.body.id  number → string
! deprecated  /v1/users  sunset: 2026-12-01`}
                    </pre>
                </div>
            </section>
        </main>
    );
}
