import { ArrowRight, BookOpen, Award, Sparkles } from 'lucide-react';
import { AppLink } from '@/app/router';
import { BLOG_ARTICLES } from '@/domain/content';
import { SubpageHero } from '@/components/layout/SubpageHero';

export function AboutPage() {
  return (
    <div className="about-page">
      <SubpageHero
        variant="seal-right"
        title="Nossa Trajetória"
        subtitle="Da economia ao laboratório de sabores: a busca pelo verdadeiro gelato purista em Curitiba."
      />

      <section className="about-story-section">
        <div className="site-container about-story-grid">
          <div className="about-portrait-frame">
            <img
              src="/assets/images/chef-harlen.png"
              alt="Chef Harlen Brandão no laboratório da Crema Lab"
              className="about-portrait-img"
            />
          </div>

          <div className="about-story-copy">
            <span className="eyebrow-tag">A ESSÊNCIA CREMA LAB</span>
            <h2 className="about-story-heading">
              Uma história de paixão, arte e rigor técnico
            </h2>
            <p className="about-story-p">
              Após uma imersão profunda em Brescia, no norte da Itália, a
              economista e chef Harlen Brandão trouxe a Curitiba a filosofia do
              gelato purista: receitas formuladas do zero, sem bases prontas,
              gorduras hidrogenadas ou aromatizantes sintéticos.
            </p>
            <p className="about-story-p">
              No nosso laboratório, cada ingrediente dita a receita. Do pistache
              tostado ao limão siciliano espremido no dia, respeitamos a
              sazonalidade e produzimos em pequenos lotes diários para garantir
              textura cremosa, temperatura ideal no paladar e sabor autêntico.
            </p>

            <div className="about-pillars-mini">
              <div className="about-pillar-box">
                <Award size={18} />
                <div>
                  <strong>Escola Italiana (Brescia)</strong>
                  <span>Balanceamento técnico do zero</span>
                </div>
              </div>
              <div className="about-pillar-box">
                <Sparkles size={18} />
                <div>
                  <strong>Rótulo Limpo</strong>
                  <span>100% livre de pastas artificiais</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <AppLink to="/sabores" className="btn-coral">
                <span>EXPLORAR SABORES</span>
                <ArrowRight size={14} />
              </AppLink>
              <AppLink to="/unidades" className="btn-terracotta">
                <span>VISITAR UNIDADES</span>
                <ArrowRight size={14} />
              </AppLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function BlogPage() {
  return (
    <div className="blog-page">
      <SubpageHero
        variant="seal-right"
        title="Journal do Lab"
        subtitle="Histórias sobre ingredientes reais, cultura do gelato italiano, cafés especiais e bastidores."
      />

      <section className="blog-list-section">
        <div className="site-container">
          <div className="blog-cards-grid">
            {BLOG_ARTICLES.map((article) => (
              <article key={article.id} className="blog-card">
                <div className="blog-card-thumb">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="blog-card-img"
                  />
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="blog-card-title">{article.title}</h2>
                  <p className="blog-card-excerpt">{article.excerpt}</p>
                  <div className="mt-4">
                    <AppLink to="/sabores" className="blog-read-link">
                      <BookOpen size={13} />
                      <span>Experimentar no Lab</span>
                      <ArrowRight size={12} />
                    </AppLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
