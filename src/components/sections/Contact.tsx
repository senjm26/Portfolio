export default function Contact() {
  return (
    <section className="py-32 px-16 border-t border-black/10 bg-white text-black">
      <h2 className="text-4xl mb-6">Contact</h2>

      <p className="max-w-xl text-gray-600 mb-10">
        I’m always open to discussing engineering opportunities,
        design projects, or collaborative work.
      </p>

      <div className="space-y-4 text-lg">
        <p>
          <span className="text-gray-500">Email</span><br />
          your.email@example.com
        </p>

        <p>
          <span className="text-gray-500">Location</span><br />
          Pittsburgh, PA
        </p>

        <p>
          <span className="text-gray-500">LinkedIn</span><br />
          linkedin.com/in/yourname
        </p>

        <p>
          <span className="text-gray-500">GitHub</span><br />
          github.com/yourusername
        </p>
      </div>
    </section>
  );
}
