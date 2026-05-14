'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '08'

export default function CardPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Card"
        description="Surface containers that group related content into scannable units. Six families: Simple, Standard, Form, Data viz, Overview, and Asset."
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

      <SectionWrapper id="accessibility" num="07" total={TOTAL} title="Accessibility">
        <TodoSection />
      </SectionWrapper>

      <SectionWrapper id="anatomy" num="08" total={TOTAL} title="Anatomy">
        <TodoSection />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
