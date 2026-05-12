'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  TodoSection, PageFooter,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '10'

export default function MarkdownPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Markdown"
        description="Renders raw Markdown strings as styled HTML. Sanitizes input. Supports headings, lists, code blocks, links, and tables."
        status="stable"
        since="1.1.0"
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <TodoSection />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <TodoSection />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <TodoSection />
      </SectionWrapper>

      <SectionWrapper id="sizes" num="04" total={TOTAL} title="Sizes">
        <TodoSection />
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="05" total={TOTAL} title="Required pairings">
        <TodoSection />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="06" total={TOTAL} title="Forbidden and refuse">
        <TodoSection />
      </SectionWrapper>

      <SectionWrapper id="api" num="07" total={TOTAL} title="API">
        <TodoSection />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="08" total={TOTAL} title="Accessibility">
        <TodoSection />
      </SectionWrapper>

      <SectionWrapper id="canonical-example" num="09" total={TOTAL} title="Canonical example">
        <TodoSection />
      </SectionWrapper>

      <SectionWrapper id="related" num="10" total={TOTAL} title="Related components">
        <TodoSection />
      </SectionWrapper>

      <PageFooter />
    </ComponentPageLayout>
  )
}
