import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <>
      <main>
      <img
        alt="Qwik logo"
        src="https://ovicio.com.br/wp-content/uploads/2022/02/20220204-ovicio-star-wars-logo-new-tall-730x365.jpg"
      />
        <section>
          <Slot />
        </section>
      </main>
    </>
  );
});
