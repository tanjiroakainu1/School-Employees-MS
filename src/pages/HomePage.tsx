import { Link } from 'react-router-dom';
import { roleAccounts } from '@/config/roleAccounts';
import { roleConfigs } from '@/config/roleConfig';
import { systemFlowSteps, systemFeatures, roleSummaries } from '@/config/systemInfo';
import { getPublicIcon, publicIcons } from '@/config/publicIcons';
import DeveloperCredit from '@/components/shared/DeveloperCredit';
import SectionIntro from '@/components/shared/SectionIntro';

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="home-hero relative overflow-hidden">
        <div className="hero-bg absolute inset-0" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-32 top-0 h-96 w-96 animate-glow-pulse rounded-full bg-accent-400/30 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-[30rem] w-[30rem] rounded-full bg-primary-400/25 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm sm:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent-400" />
              School Personnel Management Platform
            </span>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              Manage Your School Employees{' '}
              <span className="bg-gradient-to-r from-accent-200 via-white to-primary-200 bg-clip-text text-transparent">
                Smarter
              </span>
            </h1>
            <p className="mt-5 text-base text-green-100 sm:text-lg lg:text-xl">
              One unified system for attendance, leave, performance, departments, and HR workflows —
              with dedicated portals for every role in your school.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 xs:flex-row sm:mt-10">
              <Link to="/register" className="btn-primary w-full bg-white px-8 py-3.5 text-base font-bold text-primary-700 shadow-lg hover:bg-primary-50 xs:w-auto">
                Get Started Free
              </Link>
              <Link to="/login" className="btn-secondary w-full border-white/30 bg-white/10 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm hover:bg-white/20 xs:w-auto">
                Sign In
              </Link>
            </div>
            <p className="mt-4 text-xs text-green-200/90 sm:text-sm">
              No setup required · Try demo accounts instantly · Meet <strong>SAGE</strong>, your AI assistant 🎓 · Built by <strong>Raminder Jangao</strong> 🚀
            </p>
          </div>

          {/* Stats strip */}
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 xs:grid-cols-2 sm:mt-12 sm:grid-cols-4 sm:gap-4 lg:mt-16">
            {[
              { value: '4', label: 'User Roles' },
              { value: '8+', label: 'Modules' },
              { value: '30', label: 'Feature Pages' },
              { value: '100%', label: 'Role-Based' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/10 px-4 py-4 text-center backdrop-blur-sm sm:py-5">
                <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
                <p className="mt-0.5 text-xs text-green-200/80 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Flow */}
      <section id="flow" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            tag="System Flow"
            title="How the System Works"
            description="From registration to daily operations — here is the complete journey through the School Employees Management System."
          />

          <div className="mt-12 space-y-0 lg:mt-16">
            {systemFlowSteps.map((step, index) => (
              <div key={step.step} className="relative flex flex-col gap-4 lg:flex-row lg:gap-8">
                {/* Connector line */}
                {index < systemFlowSteps.length - 1 && (
                  <div className="absolute left-6 top-16 hidden h-full w-0.5 bg-gradient-to-b from-primary-300 to-primary-100 lg:left-[2.65rem] lg:block" />
                )}

                <div className="flex shrink-0 items-start gap-4 lg:w-72">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl brand-gradient text-white shadow-lg sm:h-14 sm:w-14">
                    {getPublicIcon(step.icon)}
                  </div>
                  <div className="pt-1 lg:hidden">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary-600">Step {step.step}</span>
                    <h3 className="text-lg font-bold text-ink-900">{step.title}</h3>
                  </div>
                </div>

                <div className="card-hover flex-1 lg:mb-6">
                  <span className="hidden text-xs font-bold uppercase tracking-wider text-primary-600 lg:inline">Step {step.step}</span>
                  <h3 className="hidden text-lg font-bold text-ink-900 lg:block lg:mt-1">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-600 sm:text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual workflow diagram */}
          <div className="mt-12 rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50/50 to-accent-50/30 p-4 sm:p-6 lg:mt-16">
            <p className="mb-4 text-center text-sm font-bold text-ink-700">Leave Request Workflow Example</p>
            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-4 sm:gap-3">
              {['Employee Submits', 'Dept Head Reviews', 'HR Approves', 'Notification Sent'].map((label, i) => (
                <div key={label} className="flex flex-col items-center rounded-xl bg-white/60 p-3 text-center ring-1 ring-primary-100/80 sm:p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white shadow-md sm:h-12 sm:w-12 sm:text-sm">
                    {i + 1}
                  </div>
                  <p className="mt-2 text-[10px] font-semibold leading-snug text-ink-700 sm:text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="scroll-mt-20 bg-mint-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            tag="User Roles"
            title="Four Dedicated Portals"
            description="Each role gets a custom dashboard, sidebar navigation, and permissions tailored to their responsibilities."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:gap-6">
            {roleSummaries.map((role, index) => {
              const account = roleAccounts[index];
              return (
                <div key={role.role} className="card-hover group overflow-hidden p-0">
                  <div className={`bg-gradient-to-r ${role.gradient} px-5 py-4 sm:px-6`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                        {account && publicIcons[account.icon as keyof typeof publicIcons]}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{role.label}</h3>
                        {account && (
                          <p className="text-xs text-white/80">{account.user.position} · {account.user.department}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <ul className="space-y-2">
                      {role.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-ink-600">
                          <svg className="h-4 w-4 shrink-0 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/login"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 transition group-hover:gap-2"
                    >
                      Access {role.label} Portal
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            tag="Features"
            title="Everything Your School Needs"
            description="Comprehensive modules covering the full employee lifecycle — from hiring to performance reviews."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:mt-12 lg:grid-cols-4 lg:gap-5">
            {systemFeatures.map((feature) => (
              <div key={feature.title} className="card-hover text-center sm:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 text-primary-600 sm:mx-0">
                  {getPublicIcon(feature.icon)}
                </div>
                <h3 className="mt-4 font-bold text-ink-900">{feature.title}</h3>
                <p className="mt-1.5 text-sm text-ink-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo preview */}
      <section className="bg-mint-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            tag="Try It Now"
            title="Explore With Demo Accounts"
            description="Jump into any role instantly — no registration needed for demo access."
          />

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {roleAccounts.map((account) => (
              <Link
                key={account.user.email}
                to="/login#demo"
                className="card-hover group flex items-center gap-3 p-4"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md ${account.gradient}`}>
                  {publicIcons[account.icon as keyof typeof publicIcons]}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-ink-900">{account.user.name}</p>
                  <p className="truncate text-xs text-ink-500">{roleConfigs[account.user.role].label}</p>
                </div>
                <svg className="ml-auto h-4 w-4 shrink-0 text-primary-200 transition group-hover:translate-x-0.5 group-hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Developer showcase */}
      <DeveloperCredit variant="showcase" className="bg-mint-50" />

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="hero-bg absolute inset-0" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-accent-400/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Ready to Streamline Your School HR?
          </h2>
          <p className="mt-4 text-sm text-green-100 sm:text-base">
            Create your account in seconds or sign in with a demo role to explore the full system.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 xs:flex-row">
            <Link to="/register" className="btn-primary w-full bg-white px-8 py-3.5 text-base font-bold text-primary-700 hover:bg-primary-50 xs:w-auto">
              Create Free Account
            </Link>
            <Link to="/login" className="btn-secondary w-full border-white/30 bg-transparent px-8 py-3.5 text-base font-bold text-white hover:bg-white/10 xs:w-auto">
              Sign In Instead
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
