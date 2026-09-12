import FrameScrollHero from '@/components/FrameScrollHero';
import ProjectPortal from '@/components/projects/ProjectPortal';
import ProjectScrollStack from '@/components/projects/ProjectScrollStack';
import LogoLoopScene from '@/components/projects/LogoLoopScene';
import AboutSection from '@/components/about/AboutSection';
import EducationSection from '@/components/about/EducationSection';
import ExperienceSection from '@/components/about/ExperienceSection';

export default function HomePage() {
  return <><FrameScrollHero /><ProjectPortal /><LogoLoopScene /><ProjectScrollStack /><AboutSection /><EducationSection /><ExperienceSection /></>;
}
