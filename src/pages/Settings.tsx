
import { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import { useUserSettings } from '@/contexts/UserSettingsContext';
import { ArrowLeft, Check, Moon, Bell, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from "sonner";

const Settings = () => {
  const { settings, updateSettings, resetSettings } = useUserSettings();
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = () => {
    setIsResetting(true);
    
    setTimeout(() => {
      resetSettings();
      setIsResetting(false);
      toast.success("Settings reset successfully");
    }, 500);
  };

  const handleLanguageChange = (value: string) => {
    updateSettings({ language: value as 'en' | 'es' | 'fr' | 'de' });
    toast.success("Language updated successfully");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4 p-2 rounded-full hover:bg-slate-100 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          {/* Appearance Section */}
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon className="h-5 w-5 text-slate-600" />
                <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
              </div>
              <Switch
                id="dark-mode"
                checked={settings.darkMode}
                onCheckedChange={(checked) => {
                  updateSettings({ darkMode: checked });
                  toast.success(checked ? "Dark mode enabled" : "Dark mode disabled");
                }}
              />
            </div>
          </div>

          {/* Notifications Section */}
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-slate-600" />
                <Label htmlFor="notifications" className="font-medium">Enable Notifications</Label>
              </div>
              <Switch
                id="notifications"
                checked={settings.notificationsEnabled}
                onCheckedChange={(checked) => {
                  updateSettings({ notificationsEnabled: checked });
                  toast.success(checked ? "Notifications enabled" : "Notifications disabled");
                }}
              />
            </div>
          </div>

          {/* Language Section */}
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold mb-4">Language</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-slate-600" />
                <Label htmlFor="language-select" className="font-medium">Language</Label>
              </div>
              <Select
                value={settings.language}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger id="language-select" className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reset Section */}
          <div className="p-6">
            <button
              onClick={handleReset}
              disabled={isResetting}
              className="text-red-500 hover:text-red-600 font-medium flex items-center"
            >
              {isResetting ? (
                <>
                  <span className="mr-2">Resetting...</span>
                  <div className="animate-spin h-4 w-4 border-2 border-red-500 rounded-full border-t-transparent"></div>
                </>
              ) : (
                "Reset all settings to default"
              )}
            </button>
          </div>
        </div>
      </main>
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue">
                <div className="absolute h-2 w-2 rounded-full bg-brand-orange top-1 left-1"></div>
              </div>
              <span className="text-lg font-semibold">agent.ai</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-8 text-sm text-gray-600">
              <a href="#" className="hover:text-primary">Terms of Service</a>
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Contact Us</a>
              <a href="#" className="hover:text-primary">Help Center</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} agent.ai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Settings;
