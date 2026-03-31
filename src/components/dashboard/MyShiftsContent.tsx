'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Clock, AlertTriangle, CheckCircle2,
  Search, ChevronDown, Calendar, Moon, Sun, Sunset,
  RefreshCw, CalendarDays, Building2, Banknote, Filter,
  ArrowUpDown, Star, ChevronRight, X, Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/useAppStore';

type Eligibility = 'eligible' | 'restricted' | 'near-expiry';
type ShiftType = 'day' | 'night' | 'evening';
type Tab = 'upcoming' | 'available' | 'past';

interface AvailableShift {
  id: number; hospital: string; dept: string; band: string;
  date: string; time: string; hours: number; rate: number;
  distance: string; eligibility: Eligibility; shiftType: ShiftType;
  restrictionNote?: string;
}
interface MyShift {
  id: number; hospital: string; dept: string; shiftType: string;
  date: string; time: string; rate: string; location: string;
  status: 'Confirmed' | 'Pending' | 'Completed'; hours: string;
}

const AVAILABLE_SHIFTS: AvailableShift[] = [
  { id:1, hospital:'Royal London Hospital',       dept:'ICU Nursing',       band:'Band 6', date:'Mon, 25 Mar', time:'07:00-19:00', hours:12, rate:52, distance:'2.3 mi', eligibility:'eligible',    shiftType:'day'     },
  { id:2, hospital:"St. Bartholomew's Hospital",  dept:'Emergency Medicine', band:'Band 5', date:'Tue, 26 Mar', time:'19:00-07:00', hours:12, rate:48, distance:'4.1 mi', eligibility:'restricted',  shiftType:'night',   restrictionNote:'Registration renewal required before booking' },
  { id:3, hospital:"King's College Hospital",     dept:'General Surgery',    band:'Band 5', date:'Wed, 27 Mar', time:'07:00-19:00', hours:12, rate:45, distance:'6.8 mi', eligibility:'eligible',    shiftType:'day'     },
  { id:4, hospital:"Guy's Hospital",              dept:'Cardiology',         band:'Band 6', date:'Thu, 28 Mar', time:'13:00-01:00', hours:12, rate:55, distance:'3.5 mi', eligibility:'near-expiry', shiftType:'evening' },
  { id:5, hospital:'University College Hospital', dept:'Neurology',          band:'Band 6', date:'Fri, 29 Mar', time:'07:00-19:00', hours:12, rate:50, distance:'5.2 mi', eligibility:'eligible',    shiftType:'day'     },
  { id:6, hospital:'Chelsea & Westminster',       dept:'A&E Department',     band:'Band 5', date:'Sat, 30 Mar', time:'19:00-07:00', hours:12, rate:58, distance:'7.1 mi', eligibility:'eligible',    shiftType:'night'   },
];

const UPCOMING: MyShift[] = [
  { id:1, hospital:"St. Mary's Hospital",   dept:'ICU Department',       shiftType:'Day Shift',   date:'Mar 15, 2024', time:'07:00–19:00', rate:'35', location:'Paddington, London',    status:'Confirmed', hours:'12 hrs' },
  { id:2, hospital:'Royal London Hospital', dept:'Emergency Department', shiftType:'Night Shift', date:'Mar 18, 2024', time:'19:00–07:00', rate:'38', location:'Whitechapel, London',   status:'Pending',   hours:'12 hrs' },
  { id:3, hospital:"Guy's Hospital",        dept:'Cardiac Unit',         shiftType:'Day Shift',   date:'Mar 22, 2024', time:'07:00–19:00', rate:'32', location:'London Bridge, London', status:'Confirmed', hours:'12 hrs' },
  { id:4, hospital:'Chelsea & Westminster', dept:'A&E Department',       shiftType:'Night Shift', date:'Mar 25, 2024', time:'19:00–07:00', rate:'36', location:'Chelsea, London',       status:'Confirmed', hours:'12 hrs' },
];

const PAST: MyShift[] = [
  { id:10, hospital:"St. Mary's Hospital",   dept:'ICU',       shiftType:'Night Shift', date:'Mar 10, 2024', time:'19:00–07:00', rate:'35', location:'Paddington, London',    status:'Completed', hours:'12 hrs' },
  { id:11, hospital:'Royal London Hospital', dept:'Emergency', shiftType:'Day Shift',   date:'Mar 8, 2024',  time:'07:00–19:00', rate:'38', location:'Whitechapel, London',   status:'Completed', hours:'12 hrs' },
  { id:12, hospital:"Guy's Hospital",        dept:'Cardiac',   shiftType:'Night Shift', date:'Mar 5, 2024',  time:'19:00–07:00', rate:'32', location:'London Bridge, London', status:'Completed', hours:'12 hrs' },
];

const eligCfg: Record<Eligibility, { label: string; bg: string; text: string; border: string; icon: React.ElementType }> = {
  eligible:      { label:'Eligible',    bg:'bg-emerald-50', text:'text-emerald-700', border:'border-emerald-200', icon:CheckCircle2 },
  restricted:    { label:'Restricted',  bg:'bg-red-50',     text:'text-red-600',     border:'border-red-200',     icon:AlertTriangle },
  'near-expiry': { label:'Near Expiry', bg:'bg-amber-50',   text:'text-amber-700',   border:'border-amber-200',   icon:AlertTriangle },
};

const shiftIconMap: Record<ShiftType, React.ElementType> = { day:Sun, night:Moon, evening:Sunset };
const shiftColorMap: Record<ShiftType, string> = {
  day:     'bg-amber-50 text-amber-600 border-amber-200',
  night:   'bg-indigo-50 text-indigo-600 border-indigo-200',
  evening: 'bg-violet-50 text-violet-600 border-violet-200',
};

const statusCfg: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Confirmed: { bg:'bg-emerald-50', text:'text-emerald-700', border:'border-emerald-200', dot:'bg-emerald-500' },
  Pending:   { bg:'bg-amber-50',   text:'text-amber-700',   border:'border-amber-200',   dot:'bg-amber-400'   },
  Completed: { bg:'bg-slate-100',  text:'text-slate-600',   border:'border-slate-200',   dot:'bg-slate-400'   },
};

const distanceOptions = ['Within 5 miles', 'Within 10 miles', 'Within 20 miles', 'Any distance'];
const sortOptions     = ['Nearest first', 'Highest pay', 'Soonest date'];

export default function MyShiftsContent() {
  const [tab, setTab]                   = useState<Tab>('available');
  const [location, setLocation]         = useState('');
  const [payMax, setPayMax]             = useState(60);
  const [distance, setDistance]         = useState('Within 10 miles');
  const [sortBy, setSortBy]             = useState('Nearest first');
  const [showDistMenu, setShowDistMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [search, setSearch]             = useState('');
  const [showFilters, setShowFilters]   = useState(false);
  const { setSidebarOpen } = useAppStore();

  const filtered   = AVAILABLE_SHIFTS.filter(s => s.rate <= payMax);
  const myShifts   = tab === 'upcoming' ? UPCOMING : tab === 'past' ? PAST : [];
  const filteredMy = myShifts.filter(s =>
    s.hospital.toLowerCase().includes(search.toLowerCase()) ||
    s.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen bg-[#F0F4FF]">

      {/* ── Top Header ── */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 h-[72px] flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base md:text-xl font-semibold text-slate-900 tracking-tight truncate">
              {tab === 'available' ? 'Find Shifts' : 'My Shifts'}
            </h1>
            <p className="hidden sm:block text-xs md:text-sm text-slate-500 mt-0.5">
              {tab === 'available' ? 'Browse and book available healthcare shifts' : 'Track your upcoming and completed shifts'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {tab !== 'available' && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-500 bg-white border border-slate-200 hover:border-slate-300 hover:text-slate-700 transition-all">
              <ArrowUpDown className="w-[13px] h-[13px]" /><span className="hidden sm:inline">Sort</span>
            </button>
          )}
        </div>
      </div>

      <div className="px-4 md:px-8 py-5 md:py-8 max-w-[1100px] space-y-4 md:space-y-7">

        {/* ── Stats Strip ── */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }}
          className="grid grid-cols-3 gap-3 md:gap-4">
          {(tab === 'available' ? [
            { label:'Available', value:String(AVAILABLE_SHIFTS.length), sub:'shifts', icon:CalendarDays, color:'text-blue-600',    bg:'bg-blue-50'    },
            { label:'Avg. Pay',  value:'£51',                            sub:'per hour', icon:Banknote,   color:'text-emerald-600', bg:'bg-emerald-50' },
            { label:'Closest',   value:'2.3 mi',                         sub:'away',    icon:MapPin,      color:'text-violet-600',  bg:'bg-violet-50'  },
          ] : [
            { label:'Shifts',   value:tab === 'upcoming' ? String(UPCOMING.length) : String(PAST.length),       sub:tab === 'upcoming' ? 'booked' : 'done', icon:CalendarDays, color:'text-blue-600',    bg:'bg-blue-50'    },
            { label:'Hours',    value:tab === 'upcoming' ? `${UPCOMING.length * 12}h` : `${PAST.length * 12}h`, sub:'total',                                icon:Clock,        color:'text-indigo-600',  bg:'bg-indigo-50'  },
            { label:'Earnings', value:tab === 'upcoming' ? '£1,692' : '£315',                                   sub:'estimated',                            icon:Banknote,     color:'text-emerald-600', bg:'bg-emerald-50' },
          ]).map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-3 md:p-5 hover:shadow-md transition-shadow">
              <div className={`w-8 h-8 md:w-10 md:h-10 ${s.bg} rounded-xl flex items-center justify-center mb-2 md:mb-3`}>
                <s.icon className={`w-4 h-4 md:w-5 md:h-5 ${s.color}`} />
              </div>
              <p className="text-lg md:text-2xl font-bold text-slate-900 tracking-tight leading-none">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-tight">{s.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Tab Bar + Search ── */}
        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3, delay:0.05 }}
          className="space-y-3">
          {/* Row 1: tabs + filter button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 bg-white rounded-xl border border-slate-200 p-1 flex-1 sm:flex-none">
              {([
                { key:'upcoming'  as Tab, label:'Upcoming',  count:UPCOMING.length         },
                { key:'available' as Tab, label:'Available', count:AVAILABLE_SHIFTS.length },
                { key:'past'      as Tab, label:'Past',      count:PAST.length             },
              ]).map(({ key, label, count }) => {
                const active = tab === key;
                return (
                  <button key={key} onClick={() => setTab(key)}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${active ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                    <span className="truncate">{label}</span>
                    <span className={`hidden sm:inline text-xs font-semibold px-1.5 py-[1px] rounded-md ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>{count}</span>
                  </button>
                );
              })}
            </div>
            {tab === 'available' && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all border shrink-0 ${showFilters ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'}`}
              >
                <Filter className="w-[14px] h-[14px]" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            )}
          </div>
          {/* Row 2: search full width */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[13px] h-[13px] text-slate-400" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder={tab === 'available' ? 'Search hospital or specialty...' : 'Search shifts...'}
              className="pl-8 h-[38px] w-full bg-white border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-500/30" />
          </div>
        </motion.div>

        {/* ── AVAILABLE TAB ── */}
        {tab === 'available' && (
          <div className="space-y-4 md:space-y-5">

            {/* Collapsible Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }} transition={{ duration:0.2 }} className="overflow-hidden">
                  <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-semibold text-slate-800">Filter Shifts</p>
                      <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-[13px] h-[13px] text-slate-400" />
                          <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="Search location..."
                            className="pl-8 h-[38px] bg-slate-50 border-slate-200 rounded-lg text-sm placeholder:text-slate-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                          Max Pay <span className="text-blue-600 font-bold normal-case">£{payMax}/hr</span>
                        </label>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 h-[38px] flex items-center gap-3">
                          <span className="text-xs text-slate-400 shrink-0">£25</span>
                          <input type="range" min={25} max={80} value={payMax} onChange={e => setPayMax(Number(e.target.value))} className="flex-1 h-[3px] accent-blue-600 cursor-pointer" />
                          <span className="text-xs text-slate-400 shrink-0">£80</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-[13px] h-[13px] text-slate-400 pointer-events-none" />
                          <input type="date" className="w-full pl-8 pr-3 h-[38px] bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/30" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Distance</label>
                        <div className="relative">
                          <button onClick={() => { setShowDistMenu(!showDistMenu); setShowSortMenu(false); }}
                            className="w-full h-[38px] bg-slate-50 border border-slate-200 rounded-lg px-3 flex items-center justify-between text-sm text-slate-600 hover:border-slate-300 transition-colors">
                            <span className="truncate">{distance}</span>
                            <ChevronDown className="w-[13px] h-[13px] text-slate-400 shrink-0 ml-1" />
                          </button>
                          {showDistMenu && (
                            <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-lg shadow-lg border border-slate-200 z-30 overflow-hidden">
                              {distanceOptions.map(opt => (
                                <button key={opt} onClick={() => { setDistance(opt); setShowDistMenu(false); }}
                                  className={`w-full text-left px-3 py-2.5 text-sm hover:bg-slate-50 transition-colors ${opt === distance ? 'text-blue-600 font-semibold bg-blue-50' : 'text-slate-600'}`}>
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-slate-100">
                      <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">Reset</button>
                      <Button className="h-[34px] bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 text-sm font-semibold">Apply</Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results bar */}
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-slate-500 shrink-0">
                <span className="font-semibold text-slate-800">{filtered.length}</span> shifts found
              </p>
              <div className="relative">
                <button onClick={() => { setShowSortMenu(!showSortMenu); setShowDistMenu(false); }}
                  className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg px-2.5 sm:px-3 py-1.5 transition-colors whitespace-nowrap">
                  <ArrowUpDown className="w-[12px] h-[12px] shrink-0" />
                  <span className="hidden sm:inline">Sort: <span className="font-semibold text-slate-700">{sortBy}</span></span>
                  <span className="sm:hidden font-semibold text-slate-700">Sort</span>
                  <ChevronDown className="w-[12px] h-[12px] shrink-0" />
                </button>
                {showSortMenu && (
                  <div className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg border border-slate-200 z-30 overflow-hidden w-[160px]">
                    {sortOptions.map(opt => (
                      <button key={opt} onClick={() => { setSortBy(opt); setShowSortMenu(false); }}
                        className={`w-full text-left px-3 py-2.5 text-sm hover:bg-slate-50 transition-colors ${opt === sortBy ? 'text-blue-600 font-semibold bg-blue-50' : 'text-slate-600'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Shift Cards — single col on mobile, 2-col on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {filtered.map((shift, i) => {
                const elig = eligCfg[shift.eligibility];
                const EligIcon = elig.icon;
                const ShiftIcon = shiftIconMap[shift.shiftType];
                const shiftColor = shiftColorMap[shift.shiftType];
                return (
                  <motion.div key={shift.id}
                    initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05, duration:0.25 }}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200"
                  >
                    {/* top accent bar */}
                    <div className={`h-[3px] w-full ${shift.eligibility === 'eligible' ? 'bg-gradient-to-r from-blue-500 to-blue-400' : shift.eligibility === 'restricted' ? 'bg-gradient-to-r from-red-400 to-red-300' : 'bg-gradient-to-r from-amber-400 to-amber-300'}`} />
                    <div className="p-4 md:p-5">

                      {/* Hospital + eligibility badge */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                            <Building2 className="w-4 h-4 text-slate-500" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-slate-900 truncate leading-snug">{shift.hospital}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">{shift.dept} · {shift.band}</p>
                          </div>
                        </div>
                        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg border shrink-0 ${elig.bg} ${elig.text} ${elig.border}`}>
                          <EligIcon className="w-[10px] h-[10px]" />
                          <span className="hidden sm:inline">{elig.label}</span>
                          <span className="sm:hidden">{elig.label.split(' ')[0]}</span>
                        </span>
                      </div>

                      {/* Pay + shift type — stacked on mobile */}
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xl md:text-2xl font-bold text-slate-900 leading-none tracking-tight">
                            £{shift.rate}<span className="text-sm font-normal text-slate-400">/hr</span>
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">£{shift.rate * shift.hours} · {shift.hours}h</p>
                        </div>
                        <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1.5 rounded-lg border ${shiftColor}`}>
                          <ShiftIcon className="w-[13px] h-[13px]" />
                          <span className="capitalize">{shift.shiftType}</span>
                        </span>
                      </div>

                      {/* Date / time / distance chips */}
                      <div className="flex items-center gap-2 flex-wrap mb-3 pb-3 border-b border-slate-100">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <CalendarDays className="w-3 h-3 text-slate-400" />{shift.date}
                        </span>
                        <span className="w-[3px] h-[3px] rounded-full bg-slate-300" />
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3 text-slate-400" />{shift.time}
                        </span>
                        <span className="w-[3px] h-[3px] rounded-full bg-slate-300" />
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="w-3 h-3 text-slate-400" />{shift.distance}
                        </span>
                      </div>

                      {shift.restrictionNote && (
                        <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-3">
                          <AlertTriangle className="w-3 h-3 text-red-500 shrink-0 mt-[1px]" />
                          <span className="text-xs text-red-600 leading-snug">{shift.restrictionNote}</span>
                        </div>
                      )}

                      {shift.eligibility === 'restricted' ? (
                        <button disabled className="w-full h-[38px] rounded-lg bg-slate-100 text-slate-400 text-sm font-medium cursor-not-allowed">
                          Cannot Book — Update Compliance
                        </button>
                      ) : (
                        <Button className="w-full h-[38px] rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm">
                          Book Shift <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-center pb-4">
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 hover:shadow-sm transition-all">
                <RefreshCw className="w-[13px] h-[13px]" />Load More Shifts
              </button>
            </div>
          </div>
        )}

        {/* ── UPCOMING / PAST TABS ── */}
        {(tab === 'upcoming' || tab === 'past') && (
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.2 }}>
              {filteredMy.length > 0 ? (
                <div className="space-y-3">
                  {filteredMy.map((s, i) => {
                    const st = statusCfg[s.status];
                    const isNight = s.shiftType.toLowerCase().includes('night');
                    return (
                      <motion.div key={s.id}
                        initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05, duration:0.2 }}
                        className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200 group"
                      >
                        {/* Top row: icon + hospital + status + rate */}
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isNight ? 'bg-indigo-50' : 'bg-amber-50'}`}>
                            {isNight ? <Moon className="w-4 h-4 text-indigo-500" /> : <Sun className="w-4 h-4 text-amber-500" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            {/* Hospital name + status badge */}
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h3 className="text-sm font-semibold text-slate-900 truncate">{s.hospital}</h3>
                                <p className="text-xs text-slate-500 mt-0.5 truncate">{s.dept} · {s.shiftType}</p>
                              </div>
                              <div className="flex flex-col items-end shrink-0 gap-1">
                                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-[3px] rounded-md border ${st.bg} ${st.text} ${st.border}`}>
                                  <span className={`w-[5px] h-[5px] rounded-full shrink-0 ${st.dot}`} />
                                  {s.status}
                                </span>
                                <p className="text-base font-bold text-slate-900 leading-none">
                                  £{s.rate}<span className="text-xs font-normal text-slate-400">/hr</span>
                                </p>
                              </div>
                            </div>

                            {/* Meta chips */}
                            <div className="flex items-center gap-x-3 gap-y-1 mt-2.5 pt-2.5 border-t border-slate-100 flex-wrap">
                              <span className="flex items-center gap-1 text-xs text-slate-500">
                                <CalendarDays className="w-3 h-3 text-slate-400 shrink-0" />{s.date}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-slate-500">
                                <Clock className="w-3 h-3 text-slate-400 shrink-0" />{s.time}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-slate-500">
                                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />{s.location}
                              </span>
                            </div>

                            {/* Action row */}
                            {tab === 'upcoming' && (
                              <button className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                View details <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                            {tab === 'past' && (
                              <div className="mt-2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                {[1,2,3,4,5].map(n => (
                                  <Star key={n} className={`w-3 h-3 ${n <= 4 ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                                ))}
                                <span className="text-xs text-slate-400 ml-1">4.0</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-200">
                    <CalendarDays className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">No shifts found</p>
                  <p className="text-xs text-slate-400 mt-1.5 text-center max-w-[220px]">
                    {tab === 'upcoming' ? 'Browse available shifts to book your next one.' : 'Your completed shifts will appear here.'}
                  </p>
                  {tab === 'upcoming' && (
                    <button onClick={() => setTab('available')}
                      className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
                      Browse Shifts
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

      </div>
    </div>
  );
}
