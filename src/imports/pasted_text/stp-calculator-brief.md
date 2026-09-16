Design and build a premium mobile-first engineering utility called:

STP Water Consumption Calculator

This is a professional supplementary tool for architects, consultants, planners, and building professionals. It must NOT look like a marketing website, lead-generation form, SaaS landing page, or generic dashboard.

The product should feel like a polished native mobile utility app similar in visual quality to premium iOS calculator/health utility apps.

==================================================
PRODUCT PURPOSE
==================================================

The application helps an architect quickly estimate:

1. Daily water requirement
2. Estimated sewage generation
3. Indicative STP capacity

The user should be able to complete a calculation in seconds.

The experience must feel:
- professional
- technical
- calm
- premium
- extremely clean
- mobile-first
- intuitive
- focused
- trustworthy

Do not overload the interface with fields or explanations.

==================================================
VISUAL DIRECTION
==================================================

Use a dark premium mobile-app aesthetic.

Color palette:

Background:
#09090B
#0D0D0F

Primary cards:
#202022
#252527
#19191B

Primary text:
#F4F4F5

Secondary text:
#A1A1AA

Muted text:
#71717A

Primary accent:
#785CFF

Secondary purple:
#967FFF

Water:
#55C7DC

Sewage:
#F0A24E

Success:
#72C98F

Warning:
#E76055

Design principles:
- dark charcoal surfaces
- subtle 1px borders
- very restrained shadows
- large rounded corners
- generous whitespace
- strong typography hierarchy
- no excessive glassmorphism
- no neon
- no excessive gradients
- no decorative illustrations
- no marketing graphics
- no unnecessary icons
- no excessive animation

The design should feel like a high-quality mobile utility application.

==================================================
TARGET DEVICES
==================================================

Primary design target:

390 x 844 mobile screen

Also support:

375 x 812
393 x 852
430 x 932
tablet
desktop

Mobile is the source of truth.

Desktop should adapt the mobile design rather than becoming a completely different product.

==================================================
APP STRUCTURE
==================================================

Create TWO primary screens:

SCREEN 1:
Calculator / Input

SCREEN 2:
Your Result

The transition between the two screens should feel like a real app.

Do not place the result directly underneath the form.

==================================================
SCREEN 1 — CALCULATOR
==================================================

Top navigation:

Left:
back arrow

Center/left:
STP Calculator

Small subtitle:
Water & sewage planning utility

Right:
small information icon

Below that:

Large heading:

Calculate your
STP requirement

Supporting text:

Quick indicative calculation based on building
water-consumption standards.

==================================================
PROJECT INFORMATION
==================================================

Create a compact dark card titled:

PROJECT

Only include these three fields:

Architect / Firm
Mobile
Project Location

Do NOT add:
Email
Project stage
Completion date
Water source
STP status
Notes
Company address
Budget
Any additional lead-generation fields

These fields must remain visually secondary to the calculator.

==================================================
CALCULATOR INPUT
==================================================

Create a dark charcoal card titled:

PROJECT INPUTS

Fields:

Building Type

Contextual Building Type / Category

Quantity

Calculate button

The UI must dynamically change according to the selected building type.

==================================================
BUILDING TYPES
==================================================

Main Building Type options:

Hotel
Hospital
Hostel
Factory
Office
Restaurant
School
Cinema / Theatre

Do not show long technical names in the first dropdown.

==================================================
CONTEXTUAL OPTIONS
==================================================

HOTEL:

Hotel Category:
3 Star
4 Star
5 Star & Above

Quantity:
Number of Beds

Conversion:
1 bed = 1 person

Rates:
3 Star = 180 LPCD
4 Star = 180 LPCD
5 Star & Above = 320 LPCD

HOSPITAL:

Hospital Category:
Up to 100 Beds
Above 100 Beds

Quantity:
Number of Beds

Conversion:
1 bed = 2 persons

Rates:
Up to 100 Beds = 340 LPCD
Above 100 Beds = 450 LPCD

HOSTEL:

Do not show an unnecessary secondary category.

Quantity:
Number of Beds

Conversion:
1 bed = 1 person

Rate:
135 LPCD

FACTORY:

Factory Type:
With Bath Rooms
Without Bath Rooms

Quantity:
Number of Workers

Conversion:
1 worker = 1 person

Rates:
With Bath Rooms = 45 LPCD
Without Bath Rooms = 30 LPCD

OFFICE:

Quantity:
Number of Persons

Rate:
45 LPCD

RESTAURANT:

Quantity:
Number of Seats

Rate:
70 L/seat/day

SCHOOL:

School Type:
Day School
Boarding School

Quantity:
Number of Students

Rates:
Day School = 45 LPCD
Boarding School = 135 LPCD

CINEMA / THEATRE:

Quantity:
Number of Seats

Rate:
15 L/seat/day

==================================================
CALCULATION LOGIC
==================================================

The interface must visually communicate this calculation:

Input Quantity
↓
Design Population
↓
Water Demand
↓
Estimated Sewage
↓
Indicative STP Capacity

Formula:

Design Population =
Quantity × Persons Per Unit

Water Demand =
Design Population × Consumption Rate

Water Demand KL/day =
Water Litres/day ÷ 1000

Estimated Sewage =
Water Demand × 80%

Indicative STP =
Estimated Sewage × 1.00

Do NOT expose formulas heavily on the input screen.

Technical details belong on the result screen.

==================================================
SCREEN 2 — RESULT
==================================================

Create a completely different result screen.

Top:

Back arrow

Your result

Small subtitle:
Indicative calculation

Main section:

INDICATIVE STP FLOW

Create a custom segmented semi-circular gauge.

The gauge should visually resemble premium mobile health/calculator apps.

Use segments inspired by:
yellow
green
orange
red

But use them subtly and professionally.

The gauge should NOT dominate the entire screen.

Center:

Large number

Example:

64

Below:

KLD

Below the number:

Indicative capacity

The number must be the strongest visual element on the screen.

==================================================
ANIMATED RESULT
==================================================

When the result screen opens:

1. Screen transitions upward/fades in
2. Gauge draws from zero to final position
3. Main number animates from 0 to final KLD value
4. Water KPI appears
5. Sewage KPI appears
6. Project snapshot appears
7. Flow diagram animates
8. Comparison bars grow from zero to their final values

Animations must be:
- smooth
- short
- subtle
- professional

Avoid:
bouncing
spinning
excessive glowing
continuous floating animation

==================================================
KPI SECTION
==================================================

Create two elegant cards:

WATER DEMAND

Example:
80
KL / day

Use a subtle cyan accent.

Second:

ESTIMATED SEWAGE

Example:
64
KL / day

Use a subtle orange accent.

Do not use huge colorful blocks.

==================================================
PROJECT SNAPSHOT
==================================================

Create a compact card:

PROJECT SNAPSHOT

Example:

Hotel
5 Star & Above

250 Beds
250 Design Population
320 LPCD

Use small labels and larger values.

The card must look like supporting technical information, not a form.

==================================================
CALCULATION FLOW
==================================================

Create a visual flow:

250 Beds
↓
250 Persons
↓
80 KLD Water
↓
64 KLD Sewage
↓
64 KLD STP

Do not make this look like a traditional flowchart.

Use small circular nodes and thin connecting lines.

Animate the flow sequentially.

==================================================
COMPARISON GRAPH
==================================================

Create a minimal horizontal bar chart.

Three rows:

Water
Sewage
STP

Example:

Water    ████████████████ 80
Sewage   ████████████     64
STP      ████████████     64

Colors:

Water:
#55C7DC

Sewage:
#F0A24E

STP:
#967FFF

Bars should animate from 0 to their final value.

No chart borders.

No heavy axes.

No unnecessary legends.

==================================================
RESULT ACTION
==================================================

At the bottom:

Primary button:

Recalculate

Use the same purple accent as the Calculate button.

Do NOT add:
Get Quote
Contact Us
Book Demo
Talk to Sales
Download Brochure
Submit Lead

This is a supplementary engineering utility, not an advertisement.

==================================================
UI COMPONENTS
==================================================

Create reusable components:

AppHeader
ProjectCard
SelectCard
QuantityCard
PrimaryButton

ResultHeader
STPGauge
MetricCard
ProjectSnapshot
CalculationFlow
ComparisonBars
SecondaryButton

Use consistent:
spacing
border radius
typography
colors
motion

==================================================
TYPOGRAPHY
==================================================

Use a clean modern sans-serif.

Prefer:
Inter
SF Pro style
or a similarly clean system font.

Hierarchy:

Page heading:
28–34 px

Result value:
40–48 px

Card value:
20–24 px

Card label:
9–11 px

Supporting text:
10–12 px

Avoid overly bold typography everywhere.

==================================================
SPACING
==================================================

Use a consistent spacing system:

4
8
12
16
20
24
32
40

Never introduce random spacing values unless required for alignment.

==================================================
CORNER RADIUS
==================================================

Input controls:
12–14 px

Cards:
18–22 px

Hero result:
22–26 px

Buttons:
22–26 px

Pills:
999 px

==================================================
MOTION
==================================================

Use a single polished easing style.

Prefer:

cubic-bezier(.22,1,.36,1)

Input screen:
subtle entrance animation

Result screen:
slide/fade transition

Gauge:
draw animation

Numbers:
count-up animation

Bars:
grow animation

Do not add decorative motion unrelated to user interaction.

==================================================
RESPONSIVE BEHAVIOR
==================================================

Mobile:
single column

Tablet:
compact centered layout

Desktop:
keep the visual hierarchy of mobile
but use available width intelligently.

Do not turn the desktop version into a traditional dashboard.

==================================================
IMPORTANT PRODUCT RULES
==================================================

This is NOT:
- a marketing page
- a CRM form
- a lead-generation page
- a sales landing page
- a generic admin dashboard

It IS:
- an engineering calculator
- a supplementary architect utility
- a fast professional tool

The user should feel:

"I can use this whenever I need an STP estimate."

Not:

"This company is trying to sell me something."

==================================================
FIGMA MAKE IMPLEMENTATION
==================================================

Build this as a functional front-end prototype.

Use:
HTML
CSS
JavaScript

Use native SVG for the main STP gauge.

Use animated CSS/SVG elements for the calculation flow.

You may use Chart.js for the comparison bar chart if useful.

Create mock data first.

Example mock result:

Building:
Hotel

Category:
5 Star & Above

Beds:
250

Design Population:
250

Rate:
320 LPCD

Water Demand:
80 KLD

Estimated Sewage:
64 KLD

Indicative STP:
64 KLD

The prototype should function without a backend.

Create clean reusable code.

Keep design tokens centralized.

Do not hard-code visual styles repeatedly.

The final result should look like a carefully designed mobile product, not an AI-generated website template.