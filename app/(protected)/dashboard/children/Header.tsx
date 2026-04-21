import Button from "@/app/components/ui/Button";

function Header() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Children</h1>
        <p className="text-gray-500 text-sm">
          Manage your children&apos;s profiles and devices
        </p>
      </div>

      <div>
        <Button>Add Child</Button>
      </div>
    </div>
  );
}

export default Header;
