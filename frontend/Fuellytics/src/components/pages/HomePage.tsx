import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '../ui/drawer';
import Header from '../ui/Header';
import { IconMenu2 } from '@tabler/icons-react';
import Card from '../ui/Card';

const HomePage = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <Drawer
        opened={opened}
        onClose={close}
        position="left"
        size="md"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <nav className="p-4">
          <div className="space-y-2">
            <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-600/80 rounded-md transition-colors">
              Examples
            </a>
            <a href="/comparisons" className="block px-4 py-2 text-sm hover:bg-blue-600/80 rounded-md transition-colors">
              Comparisons
            </a>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-600/80 rounded-md transition-colors">
              Aggregation
            </a>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-600/80 rounded-md transition-colors">
              Models
            </a>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/10">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="mt-2 space-y-2">
              <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-600/80 rounded-md transition-colors">
                Documentation
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-600/80 rounded-md transition-colors">
                Support
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-600/80 rounded-md transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </nav>
      </Drawer>

      <Header onMenuClick={open} />

      {/* Main Content */}
      <main
        className="absolute top-0 left-0 w-screen h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        {/* Welcome Card - fixed position in top right */}
        <div className="absolute top-20 right-8 z-10 space-y-4">
  {/* Welcome Card */}
  <Card
    className="max-w-lg backdrop-blur-md border border-white/20 rounded-lg shadow-lg"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(30px)",
    }}
  >
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-4">
        Welcome to Fuel-lytics!
      </h1>
      <p className="text-base text-white/90 mb-6">
        Your comprehensive resource for vehicle fuel economy data. Compare thousands of vehicles, analyze fuel efficiency trends, and make informed decisions about your next vehicle purchase.
      </p>
      <div className="space-y-3 text-white/80">
        <div className="flex items-start space-x-2">
          <span className="font-medium">✓</span>
          <p className="text-sm">Access detailed MPG data for vehicles from 1984 to present</p>
        </div>
        <div className="flex items-start space-x-2">
          <span className="font-medium">✓</span>
          <p className="text-sm">Compare fuel efficiency across different makes, models, and years</p>
        </div>
        <div className="flex items-start space-x-2">
          <span className="font-medium">✓</span>
          <p className="text-sm">Calculate potential fuel savings and environmental impact</p>
        </div>
      </div>
    </div>
  </Card>

  {/* Card with Buttons */}
  <Card
    className="max-w-lg backdrop-blur-md border border-white/20 rounded-lg shadow-lg"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(30px)",
    }}
  >
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4">
        <a href="/aggregates">
          <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-blue-700 transition-colors">Aggregates</button>
        </a>
        <a href="/examples">
          <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-blue-700 transition-colors">
            Examples
          </button>
        </a>
        <a href="/models">
          <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-blue-700 transition-colors">
            Models
          </button>
        </a>
        <a href="/comparisons">
          <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-blue-700 transition-colors">
            Comparisons
          </button>
        </a>
      </div>
    </div>
  </Card>

  {/* Final Card with Image */}
  <Card
  className="max-w-lg w-full backdrop-blur-md border border-white/20 rounded-lg shadow-lg pb-6"
  style={{
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(30px)",
    height: "calc(43vh - 120px)", // Limits the card height and leaves space at the bottom
    overflow: "hidden", // Prevents overflowing content outside the card
  }}
>
  {/* Image Section */}
  <div className="relative w-full h-60"> {/* Fixed height for image */}
    <img
      src="/images/plant-life-cycle-from-fertilization-to-germination-free-photo.jpeg"
      alt="Descriptive Alt Text"
      className="object-cover w-full h-full rounded-t-lg"
    />
  </div>
</Card>


</div>


      </main>
    </div>
  );
};

export default HomePage;