import type { Instrument } from "../site";

// How to open the installer and find the plugin, for one platform.
// file: the installer's name, as it lands in Downloads.
export default function InstallSteps({ instrument, platform, file }: { instrument: Instrument; platform: "mac" | "windows"; file: string }) {
  if (platform === "mac") {
    return (
      <ol className="install-steps">
        <li>Open <code>{file}</code> from your Downloads folder.</li>
        {!instrument.macNotarized && (
          <li>
            If macOS says it “could not verify” the installer, click <strong>Done</strong>, then go to{" "}
            <strong>System Settings → Privacy & Security</strong>, scroll down and click <strong>Open Anyway</strong>.
          </li>
        )}
        <li>Follow the steps. It installs the AU, the VST3 and the standalone app; untick any you don't want.</li>
        <li>Restart your DAW and look for <strong>Saygen → Saygen {instrument.name}</strong>.</li>
      </ol>
    );
  }
  return (
    <ol className="install-steps">
      <li>Run <code>{file}</code> from your Downloads folder.</li>
      <li>
        If Windows says it “protected your PC”, click <strong>More info</strong>, then <strong>Run anyway</strong>.
      </li>
      <li>Follow the steps. It installs the VST3 and the standalone app.</li>
      <li>Rescan plug-ins in your DAW and look for <strong>Saygen {instrument.name}</strong>.</li>
    </ol>
  );
}
