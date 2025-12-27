# [A.Min](https://a-min-black.vercel.app/) | Adversarial Shield

Defending Data in Motion with Real-time Adversarial ML Detection and AI Forensics.

![alt text](https://img.shields.io/badge/License-MIT-teal.svg)
![alt text](https://img.shields.io/badge/Framework-React_19-blue.svg)
![alt text](https://img.shields.io/badge/AI-Google_Gemini-orange.svg)
![alt text](https://img.shields.io/badge/Streaming-Confluent_Cloud-white.svg)

## Inspiration

The performance of AI models depends entirely on the integrity of the data they are trained on. However, in real-time data streaming environments, also known as Data in Motion, attackers can inject subtly manipulated poisoned data that gradually corrupts AI models and leads to catastrophic failures.

A.Min was born from the vision of moving beyond post-hoc validation. Instead of detecting problems after the damage is done, we aim to build a real-time AI immune system that detects and blocks threats at the exact moment data is generated and transmitted.

## What it does

A.Min defends real-time streaming data against adversarial attacks by combining Confluent Cloud and Google Cloud infrastructure.

- **Real-time Interception:**
Continuously monitors large-scale data flowing into Kafka topics with near-zero latency.

- **Flink SQL Analysis:**
Uses Apache Flink to filter statistical anomalies in incoming vector data in real time.

- **Vector Visualization:**
Projects high-dimensional feature vectors into a two-dimensional space to visualize shadow clusters and anomalies.

- **Gemini AI Forensics:**
Analyzes detected threat patterns using the Google Gemini 1.5 Pro model and automatically generates professional security reports for immediate response.

## How we built it

```mermaid
sequenceDiagram
    autonumber
    actor Producer as Data Producer
    participant Kafka as Confluent Cloud Kafka
    participant Flink as Flink SQL (Real-time Filter)
    participant Detector as A.Min Detector<br/>(Clustering + Distance)
    participant Viz as A.Min Dashboard<br/>(React + Recharts)
    participant Gemini as Gemini API<br/>(Gemini 3 Pro Preview)
    participant Report as Forensic Report Store
    actor Analyst as Security Analyst

    Producer->>Kafka: Publish streaming events<br/>(feature vectors, telemetry)
    Kafka->>Flink: Stream topic data
    Flink->>Detector: Compute anomaly signals<br/>(distance, cluster deviation)
    Detector-->>Flink: Return risk score + labels<br/>(normal, suspicious)

    alt Normal stream
        Flink-->>Kafka: Continue pipeline<br/>(no action)
        Flink->>Viz: Send metrics and cluster stats
    else Suspicious or Poisoning suspected
        Flink->>Viz: Push alert + suspicious points
        Flink->>Gemini: Send metadata + anomaly summary<br/>(cluster drift, distances, samples)
        Gemini->>Gemini: Threat reasoning and classification<br/>(poisoning, evasion, risk)
        Gemini-->>Report: Generate AI-synthesized forensic report
        Report-->>Viz: Report link + summary
        Viz-->>Analyst: Alert dashboard with evidence<br/>and recommended actions
        Analyst->>Viz: Triage and confirm incident
    end
```

- **Frontend:**
Built with React 19, Vite, and Tailwind CSS to deliver a high-fidelity cybersecurity-themed UI and UX.

- **Data Visualization:**
Implemented real-time cluster maps using Recharts to render thousands of data points efficiently.

- **Cloud Infrastructure:**
Confluent Cloud enables real-time data pipelines through Kafka and Flink SQL.
Google Cloud Platform hosts the infrastructure and provides access to state-of-the-art AI models.

- **AI Integration:**
Integrated the Gemini API via the @google/genai SDK to build a threat analysis engine based on streaming metadata.

## How we used Google Cloud

- **Gemini 3 Pro Preview:**
Generates intelligent forensic reports for detected security threats by converting complex numerical logs into human-readable strategic security insights.

- **Scalable Infrastructure:**
Uses Google Cloud regions to reliably process globally distributed real-time data streams.

- **Security and Authentication:**
Maintains system integrity through encrypted API communication and environment variable management following Google Cloud security best practices.

## Challenges we ran into

The biggest challenge was balancing real-time processing speed with deep security analysis. Inspecting every streaming data point in real time introduces latency.
To address this, we designed a layered architecture. Flink SQL performs lightweight first-stage filtering, while Gemini handles second-stage deep semantic analysis. This approach ensures both performance and security.

## Accomplishments that we're proud of

Our greatest achievement is building the AI-Synthesized Forensic feature that reflects the real workflow of security analysts, rather than just a visualization dashboard.
By transforming raw technical metrics into actionable security reports, A.Min significantly improves practical usability in real-world security operations.

## What we learned

We learned that data security is not only about protecting databases, but about preserving semantic integrity in modern AI systems.
We also gained valuable experience designing an end-to-end real-time security architecture by combining Confluent Cloud and Google Gemini across different ecosystems.

## What's next for A.Min

- **Self-Healing Streams:**
Automatically isolate compromised partitions and cleanse poisoned data through automated pipelines.

- **Multi-modal Defense:**
Extend adversarial detection beyond text and numerical data to include image and audio streams.

- **Hybrid Cloud Support:**
Strengthen hybrid connectors to support both on-premise and cloud environments.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
© 2025 A.Min Labs. All rights reserved.
