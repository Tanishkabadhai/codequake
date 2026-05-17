import { NextResponse } from "next/server";
import { bobInsightTemplate } from "@/lib/sample-data";

type BobRequest = {
  repoUrl?: string;
  diff?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as BobRequest;
  const apiUrl = process.env.IBM_BOB_API_URL;
  const apiKey = process.env.IBM_BOB_API_KEY;

  if (!apiUrl || !apiKey) {
    return NextResponse.json({
      source: "demo-fallback",
      insight: `${bobInsightTemplate}

Demo fallback note:
- Configure IBM_BOB_API_URL and IBM_BOB_API_KEY to route this workflow through live IBM Bob.
- Repository requested: ${body.repoUrl || "not provided"}.
- Diff characters analyzed locally before Bob handoff: ${body.diff?.length ?? 0}.`
    });
  }

  const bobResponse = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      task: "Analyze architectural instability, dependency fault zones, propagation risk, and cascade risk for Codequake.",
      repositoryUrl: body.repoUrl,
      diff: body.diff,
      outputFormat:
        "Return concise architecture reasoning with fault zones, tightly coupled systems, shockwave propagation paths, cascade risk, and test priorities."
    })
  });

  if (!bobResponse.ok) {
    return NextResponse.json(
      {
        source: "ibm-bob-error",
        insight: `${bobInsightTemplate}

IBM Bob API returned ${bobResponse.status}. The demo fallback is shown so the Codequake workflow remains usable.`
      },
      { status: 200 }
    );
  }

  const data = await bobResponse.json().catch(() => ({}));
  const insight =
    data.insight ?? data.summary ?? data.output ?? data.text ?? JSON.stringify(data, null, 2);

  return NextResponse.json({
    source: "ibm-bob-api",
    insight
  });
}
